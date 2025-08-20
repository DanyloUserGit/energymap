import type { BuildingTypes } from "../types";

export const translateBuildingType = (val: BuildingTypes): string => {
  switch (val) {
    case "residential":
      return "Житлові";
    case "commercial":
      return "Комерційні";
    case "public":
      return "Громадські";
    case "industrial":
      return "Промислові";
  }
};
