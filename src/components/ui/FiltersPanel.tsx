import { useFiltersStore } from "../../store/useFiltersStore";
import {
  EnergyClassesMap,
  type BuildingTypes,
  type EnergyClasses,
  type EnergyRange,
} from "./../../types";
import Button from "./Button";
import Typography from "./Typoghraphy";

const FiltersPanel = ({ onClose }: { onClose: () => void }) => {
  const {
    buildingType,
    energyUsage,
    energyClass,
    setBuildingType,
    setEnergyUsage,
    setEnergyClass,
    resetFilters,
  } = useFiltersStore();
  const handleEnergyClass = (val: EnergyClasses) => {
    if (energyClass.includes(val)) {
      setEnergyClass(energyClass.filter((item) => item !== val));
    } else {
      setEnergyClass([...energyClass, val]);
    }
  };
  const handleBuildingType = (val: BuildingTypes) => {
    if (buildingType.includes(val)) {
      setBuildingType(buildingType.filter((item) => item !== val));
    } else {
      setBuildingType([...buildingType, val]);
    }
  };
  const handleEnergyUsage = (val: EnergyRange) => {
    if (energyUsage.some((item) => item.label === val.label)) {
      setEnergyUsage(energyUsage.filter((item) => item.label !== val.label));
    } else {
      setEnergyUsage([...energyUsage, val]);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-card w-128 z-50 overflow-y-auto">
      <Typography variant="title">Фільтри</Typography>
      <div className="my-4">
        <Typography variant="small-title">Клас енергоефективності:</Typography>
        {EnergyClassesMap.map((item, index) => (
          <div className="my-2" key={index}>
            <label>
              <input
                checked={energyClass.includes(item as EnergyClasses)}
                onChange={() => handleEnergyClass(item as EnergyClasses)}
                type="checkbox"
              />{" "}
              <Typography>{item === "N" ? "Без класу" : item}</Typography>
            </label>
          </div>
        ))}

        <div className="my-4">
          <Typography variant="small-title">Тип будівлі:</Typography>
          <div className="my-2">
            <label>
              <input
                checked={buildingType.includes("residential")}
                onChange={() => handleBuildingType("residential")}
                type="checkbox"
              />{" "}
              <Typography>Житлові</Typography>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input
                checked={buildingType.includes("public")}
                onChange={() => handleBuildingType("public")}
                type="checkbox"
              />{" "}
              <Typography>Громадські</Typography>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input
                checked={buildingType.includes("commercial")}
                onChange={() => handleBuildingType("commercial")}
                type="checkbox"
              />{" "}
              <Typography>Комерційні</Typography>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input
                checked={buildingType.includes("industrial")}
                onChange={() => handleBuildingType("industrial")}
                type="checkbox"
              />{" "}
              <Typography>Промислові</Typography>
            </label>
          </div>
        </div>
        <div className="my-4">
          <Typography variant="small-title">
            Річне споживання (кВт·год/м²):
          </Typography>
          <div className="my-2">
            <label>
              <input
                checked={Boolean(energyUsage.find((it) => it.label == "0-50"))}
                onChange={() =>
                  handleEnergyUsage({ min: 0, max: 50, label: "0-50" })
                }
                type="checkbox"
              />{" "}
              <Typography>0-50</Typography>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input
                checked={Boolean(
                  energyUsage.find((it) => it.label == "50-100")
                )}
                onChange={() =>
                  handleEnergyUsage({ min: 50, max: 100, label: "50-100" })
                }
                type="checkbox"
              />{" "}
              <Typography>50-100</Typography>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input
                checked={Boolean(
                  energyUsage.find((it) => it.label == "100-200")
                )}
                onChange={() =>
                  handleEnergyUsage({ min: 100, max: 200, label: "100-200" })
                }
                type="checkbox"
              />{" "}
              <Typography>100-200</Typography>
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input
                checked={Boolean(energyUsage.find((it) => it.label == "200+"))}
                onChange={() =>
                  handleEnergyUsage({ min: 200, max: null, label: "200+" })
                }
                type="checkbox"
              />{" "}
              <Typography>200+</Typography>
            </label>
          </div>
        </div>
        <div className="flex gap-[4px]">
          <Button variant="primary" onClick={resetFilters}>
            Скинути
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Закрити
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
