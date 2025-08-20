import axios from "axios";
import type { LoaderState } from "../types";
import { useLoaderStore } from "../store/loaderStore";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export class API {
  // public loaderStore: LoaderState;
  // constructor() {
  //   this.loaderStore = useLoaderStore();
  // }

  async getAllBuildings(): Promise<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null> {
    try {
      const response = await axios.get("https://rivne.xyz/api/building/list/");
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return null;
    }
  }
}
