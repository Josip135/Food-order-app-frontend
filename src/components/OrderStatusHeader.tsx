import { NARUDZBA_STATUS } from "../config/order-status-config";
import { Narudzba } from "../types";
import { Progress } from "./ui/progress";

type Props = {
  narudzba: Narudzba;
}

const OrderStatusHeader = ({ narudzba }: Props) => {

  const getExpectedDelivery = () => {
    const vrijemeStvaranja = new Date(narudzba.createdAt);

    vrijemeStvaranja.setMinutes(vrijemeStvaranja.getMinutes() + narudzba.restoran.procijenjenoVrijemeDostave);

    const sati = vrijemeStvaranja.getHours();
    const minute = vrijemeStvaranja.getMinutes();

    //sati = 19
    //minute = 4
    //rezultat: 19:04 a ne 19:4
    const paddedMinute = minute < 10 ? `0${minute}` : minute;

    return `${sati}:${paddedMinute}`; //19:04
  }

  const getNarudzbaStatusInfo = () => {
    return NARUDZBA_STATUS.find((status_narudzbe) => status_narudzbe.value === narudzba.status) || NARUDZBA_STATUS[0];
  };

  return (<>
    <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
      <span>Status narudžbe: {getNarudzbaStatusInfo()?.label}</span>
      <span>Očekivano do: {getExpectedDelivery()}</span>
    </h1>
    <Progress className="animate-pulse" value={getNarudzbaStatusInfo()?.progressValue} />
  </>);
}

export default OrderStatusHeader;