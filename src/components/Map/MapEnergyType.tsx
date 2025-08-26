import { EnergyClassColors, type EnergyClasses } from "../../types";
import Typography from "../ui/Typoghraphy";

export default function MapEnergyType({
  building,
}: {
  building: EnergyClasses;
}) {
  const color =
    building === "A+" ? EnergyClassColors["A"] : EnergyClassColors[building];

  return (
    <div
      style={{ backgroundColor: color }}
      className={`px-3 max-w-fit text-white`}
    >
      <Typography variant="text">
        {building === "N" ? "Без класу" : building}
      </Typography>
    </div>
  );
}
