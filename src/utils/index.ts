// export const translateBuildingType = (val: BuildingTypes): string => {
//   switch (val) {
//     case "residential":
//       return "Житлові";
//     case "commercial":
//       return "Комерційні";
//     case "public":
//       return "Громадські";
//     case "industrial":
//       return "Промислові";
//   }
// };
type GeoJSONFeature = {
  type: "Feature";
  id?: string | number;
  properties: any;
  geometry: any;
};

type GeoJSON = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

export function normalizeGeoJSON(data: GeoJSON): GeoJSON {
  return {
    ...data,
    features: data.features.map((feature) => {
      let building = feature.properties.building;

      if (typeof building === "string") {
        try {
          building = JSON.parse(building);
        } catch (e) {
          console.warn("Не вдалось розпарсити building:", building);
          building = null;
        }
      }

      feature.properties.building = building;

      if (building?.filters) {
        feature.properties.sector = building.filters.sector;
        feature.properties.grade = building.filters.grade;
      }

      return feature;
    }),
  };
}
