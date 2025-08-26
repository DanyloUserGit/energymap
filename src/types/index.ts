export type EnergyClasses =
  | "A"
  | "A+"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "N";
export const EnergyClassesMap = ["A", "A+", "B", "C", "D", "E", "F", "G", "N"];

export interface EnergyRange {
  label: string;
  min: number;
  max: number | null;
}
export const EnergyClassColors = {
  A: "#40e0d0",
  B: "#4caf50",
  C: "#add8e6",
  D: "#fcb6a0",
  E: "#ffeb3b",
  F: "#ff9800",
  G: "#f44336",
  N: "#9e9e9e",
} as const;

export type TypographyVariants = "title" | "text" | "small-title";
export type ButtonVariants = "primary" | "secondary";
export type LoaderState = {
  loading: boolean;
  setLoading: (l: boolean) => void;
};
export type FilterState = {
  energyClass: EnergyClasses[];
  buildingType: string[];
  energyUsage: EnergyRange[];
  setBuildingType: (types: string[]) => void;
  setEnergyUsage: (energyUsage: EnergyRange[]) => void;
  setEnergyClass: (energyClass: EnergyClasses[]) => void;
  resetFilters: () => void;
};
export interface BuildingModalProps {
  title: string;
  energyClass: EnergyClasses;
  buildingType: string;
  energyUsage: number;
  address: string;
  buildingArea: number;
  buildingLink: string;
  onClose: () => void;
}
export interface BuildingProperties {
  height: number;
  minHeight: number;
  energy: string;
  area?: number;
  volume?: number;
  [key: string]: any;
}
