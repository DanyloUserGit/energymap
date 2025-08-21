import axios from "axios";
import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

export class API {
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
