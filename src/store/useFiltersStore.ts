import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EnergyClasses,
  EnergyRange,
  FilterState,
} from "../types";

export const useFiltersStore = create<FilterState>()(
  persist(
    (set) => ({
      buildingType: [],
      energyUsage: [],
      energyClass: [],
      setBuildingType: (buildingType: string[]) => set({ buildingType }),
      setEnergyUsage: (energyUsage: EnergyRange[]) => set({ energyUsage }),
      setEnergyClass: (energyClass: EnergyClasses[]) => set({ energyClass }),
      resetFilters: () =>
        set({
          buildingType: [],
          energyUsage: [],
          energyClass: [],
        }),
    }),
    {
      name: "filters-storage",
    }
  )
);
