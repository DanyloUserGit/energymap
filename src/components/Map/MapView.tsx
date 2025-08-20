import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import { API } from "../../http";
import { useFiltersStore } from "../../store/useFiltersStore";
import { EnergyClassColors } from "../../types";
import { normalizeGeoJSON } from "../../utils";
import Button from "../ui/Button";
import FiltersPanel from "../ui/FiltersPanel";
import MapBuildingModal from "./MapBuildingModal";
import MapControlls from "./MapControlls";
import MapTopPanel from "./MapTopPanel";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { buildingType, energyClass } = useFiltersStore();

  const map = useRef<mapboxgl.Map | null>(null);
  const api = new API();
  const [is3D, setIs3D] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any | null>(null);
  const [buildingsData, setBuildingsData] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>();

  const initialView = {
    center: [26.23, 50.62] as [number, number],
    zoom: 12,
    pitch: 0,
    bearing: 0,
  };
  const addFilters = () => {
    const filters: any[] = ["all"];

    if (buildingType.length > 0) {
      filters.push(["in", ["get", "sector"], ["literal", buildingType]]);
    }

    if (energyClass.length > 0) {
      filters.push([
        "in",
        [
          "coalesce",
          ["get", "grade", ["get", "filters", ["get", "building"]]],
          "N",
        ],
        ["literal", energyClass],
      ]);
    }

    map.current!.setFilter("buildings-layer", filters);
  };
  useEffect(() => {
    if (!selectedBuilding) return;
    setFiltersVisible(false);
  }, [selectedBuilding]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
    setSelectedBuilding(null);
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await api.getAllBuildings();
      if (data) {
        setBuildingsData(normalizeGeoJSON(data));
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (map.current) return;
    if (!buildingsData) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/danylo-manuliak/cme9pbv5j00aa01sdc7860czg",
      center: initialView.center,
      zoom: initialView.zoom,
      pitch: initialView.pitch,
      minZoom: 10,
      maxZoom: 17,
      dragRotate: false,
      maxBounds: [
        [26.08479, 50.53599],
        [26.35171, 50.68295],
      ],
      attributionControl: false,
    });
    map.current.on("load", () => {
      map.current!.addSource("buildings", {
        type: "geojson",
        data: buildingsData,
      });

      map.current!.addLayer({
        id: "buildings-layer",
        type: "fill-extrusion",
        source: "buildings",
        paint: {
          "fill-extrusion-color": [
            "match",
            [
              "coalesce",
              ["get", "grade", ["get", "filters", ["get", "building"]]],
              "N",
            ],
            "A",
            EnergyClassColors.A,
            "A+",
            EnergyClassColors.A,
            "B",
            EnergyClassColors.B,
            "C",
            EnergyClassColors.C,
            "D",
            EnergyClassColors.D,
            "E",
            EnergyClassColors.E,
            "F",
            EnergyClassColors.F,
            "G",
            EnergyClassColors.G,
            EnergyClassColors.N,
          ],
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "minHeight"],
          "fill-extrusion-opacity": 0.8,
        },
      });

      map.current!.on("click", "buildings-layer", (e) => {
        const feature = e.features?.[0];
        if (feature) {
          const building =
            typeof feature?.properties?.building === "string"
              ? JSON.parse(feature.properties.building)
              : feature?.properties?.building;
          setSelectedBuilding({ ...feature, building });
        }
      });
      map.current!.on("mouseenter", "buildings-layer", () => {
        map.current!.getCanvas().style.cursor = "pointer";
      });
      map.current!.on("mouseleave", "buildings-layer", () => {
        map.current!.getCanvas().style.cursor = "";
      });
      addFilters();
    });
  }, [buildingsData]);
  useEffect(() => {
    if (!map.current || !map.current.getSource("buildings") || !buildingsData)
      return;
    (map.current.getSource("buildings") as mapboxgl.GeoJSONSource).setData(
      buildingsData
    );
    addFilters();
  }, [buildingsData, energyClass, buildingType]);

  const toggle3D = () => {
    if (!map.current) return;

    if (is3D) {
      map.current.easeTo({ pitch: 0, bearing: 0 });
    } else {
      map.current.easeTo({ pitch: 45, bearing: -17.6 });
    }
    setIs3D(!is3D);
  };

  const zoomIn = () => map.current?.zoomIn({ duration: 300 });
  const zoomOut = () => map.current?.zoomOut({ duration: 300 });
  const resetView = () => {
    if (!map.current) return;
    map.current.easeTo({
      center: initialView.center,
      zoom: initialView.zoom,
      pitch: initialView.pitch,
      bearing: initialView.bearing,
      duration: 800,
    });
    setIs3D(false);
    setSelectedBuilding(null);
  };

  return (
    <div className="relative w-full h-full flex">
      <div ref={mapContainer} className="w-full h-full" />
      <MapTopPanel>
        <button
          onClick={toggle3D}
          className=" bg-brand-blueDark text-white px-3 py-1 rounded shadow hover:bg-brand-blue"
        >
          {is3D ? "2D" : "3D"}
        </button>
        <Button variant="secondary" onClick={toggleFilters}>
          Фільтри
        </Button>
      </MapTopPanel>
      <MapControlls zoomIn={zoomIn} zoomOut={zoomOut} resetPos={resetView} />
      {filtersVisible && (
        <FiltersPanel onClose={() => setFiltersVisible(false)} />
      )}
      {selectedBuilding && (
        <MapBuildingModal
          props={{
            title: selectedBuilding.building.title,
            energyClass: selectedBuilding.building.filters.grade || "N",
            energyUsage: selectedBuilding.energyUsage || 0,
            buildingType: selectedBuilding.building.filters.sector,
            address: selectedBuilding.building.address,
            buildingArea: selectedBuilding.properties.area || 0,
            buildingLink: selectedBuilding.building.url || "#",
            onClose: () => setSelectedBuilding(null),
          }}
        />
      )}
    </div>
  );
};

export default MapView;
