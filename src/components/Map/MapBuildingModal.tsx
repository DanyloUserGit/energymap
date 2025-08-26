import type { BuildingModalProps } from "../../types";
import Button from "../ui/Button";
import Typography from "../ui/Typoghraphy";
import MapEnergyType from "./MapEnergyType";

export default function MapBuildingModal({
  props,
}: {
  props: BuildingModalProps;
}) {
  return (
    <div className="h-full w-128 bg-white shadow-card p-4 rounded z-50">
      <Typography variant="title">Інформація про будівлю</Typography>
      <div className="my-8">
        <ul className="flex flex-col gap-4">
          <li>
            <Typography variant="small-title">Назва будівлі:</Typography>
            <Typography variant="text">{props.title}</Typography>
          </li>
          <li>
            <Typography variant="small-title">
              Клас енергоефективності:
            </Typography>
            <MapEnergyType building={props.energyClass} />
          </li>
          <li>
            <Typography variant="small-title">Адреса будівлі:</Typography>
            <Typography variant="text">{props.address}</Typography>
          </li>
          <li>
            <Typography variant="small-title">Тип будівлі:</Typography>
            <Typography variant="text">{props.buildingType}</Typography>
          </li>
          {/* <li>
            <Typography variant="small-title">
              Річне споживання енергоресурсів (кВт·год/м²):
              <Typography variant="text">{props.energyUsage}</Typography>
            </Typography>
          </li> */}
          <li>
            <Typography variant="small-title">Площа будівлі (м²):</Typography>
            <Typography variant="text">{props.buildingArea}</Typography>
          </li>
          <li>
            <Typography variant="small-title">Посилання на будівлю:</Typography>
            <Typography variant="text">
              <a href={props.buildingLink}>{props.buildingLink}</a>
            </Typography>
          </li>
        </ul>
      </div>
      <div className="flex gap-4">
        {" "}
        <Button variant="primary" onClick={() => {}}>
          <a href={props.buildingLink}>Детальніше</a>
        </Button>
        <Button variant="secondary" onClick={props.onClose}>
          Закрити
        </Button>
      </div>
    </div>
  );
}
