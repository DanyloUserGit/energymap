import { useEffect, useState } from "react";
import type { BuildingModalProps } from "../../types";
import { translateBuildingType } from "../../utils";
import Button from "../ui/Button";
import Typography from "../ui/Typoghraphy";
import MapEnergyType from "./MapEnergyType";
import axios from "axios";

export default function MapBuildingModal({
  props,
}: {
  props: BuildingModalProps;
}) {
  const [buildingAddress, setBuildingAddress] = useState("");
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  useEffect(() => {
    const fetch = async () => {
      const a = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.coordinates}.json?access_token=${accessToken}`
      );
      setBuildingAddress(a.data.features[0].place_name);
    };
    fetch();
  }, [props]);

  return (
    <div className="h-full w-128 bg-white shadow-card p-4 rounded z-50">
      <Typography variant="title">Інформація про будівлю</Typography>
      <div className="my-8">
        <ul className="flex flex-col gap-4">
          <li>
            <Typography variant="small-title">
              Клас енергоефективності:
            </Typography>
            <MapEnergyType building={props.energyClass} />
          </li>
          <li>
            <Typography variant="small-title">Адреса будівлі:</Typography>
            <Typography variant="text">{buildingAddress}</Typography>
          </li>
          <li>
            <Typography variant="small-title">Тип будівлі:</Typography>
            <Typography variant="text">
              {translateBuildingType(props.buildingType)}
            </Typography>
          </li>
          <li>
            <Typography variant="small-title">
              Річне споживання енергоресурсів (кВт·год/м²):
              <Typography variant="text">{props.energyUsage}</Typography>
            </Typography>
          </li>
          <li>
            <Typography variant="small-title">Площа будівлі (м²):</Typography>
            <Typography variant="text">{props.buildingArea}</Typography>
          </li>
        </ul>
      </div>
      <div className="flex gap-4">
        {" "}
        <Button variant="primary" onClick={() => {}}>
          Детальніше
        </Button>
        <Button variant="secondary" onClick={props.onClose}>
          Закрити
        </Button>
      </div>
    </div>
  );
}
