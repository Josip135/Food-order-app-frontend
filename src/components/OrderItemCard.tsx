import { useEffect, useState } from "react";
import { useUpdateMyRestaurantOrder } from "../api/MyRestaurantApi";
import { NARUDZBA_STATUS } from "../config/order-status-config";
import { Narudzba, StatusNarudzbe } from "../types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

type Props = {
  narudzba: Narudzba;
}

const OrderItemCard = ({ narudzba }: Props) => {

  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

  const [status, setStatus] = useState<StatusNarudzbe>(narudzba.status);

  useEffect(() => {
    setStatus(narudzba.status)
  }, [narudzba.status])

  const handleNarudzbaStatusChange = async (noviStatus: StatusNarudzbe) => {
    await updateRestaurantStatus({ narudzbaId: narudzba._id as string, status: noviStatus });
    setStatus(noviStatus);
  }

  const getTime = () => {
    const narudzbaDatumVrijeme = new Date(narudzba.createdAt);

    const sati = narudzbaDatumVrijeme.getHours();
    const minute = narudzbaDatumVrijeme.getMinutes();

    const paddedMinute = minute < 10 ? `0${minute}` : minute;

    return `${sati}:${paddedMinute}`;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Ime kupca:
            <span className="ml-2 font-normal">{narudzba.detaljiDostave.ime}</span>
          </div>

          <div>
            Adresa dostave:
            <span className="ml-2 font-normal">{narudzba.detaljiDostave.adresa}, {narudzba.detaljiDostave.grad}</span>
          </div>

          <div>
            Vrijeme:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>

          <div>
            Ukupna cijena:
            <span className="ml-2 font-normal">{(narudzba.ukupanZbroj / 100).toFixed(2)} €</span>
          </div>
        </CardTitle>

        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {narudzba.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">{cartItem.kolicina}</Badge>
              {cartItem.ime}
            </span>
          ))}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Koji je status ove narudže?</Label>

          <Select value={status}
            disabled={isLoading}
            onValueChange={(value) => handleNarudzbaStatusChange(value as StatusNarudzbe)}>

            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {NARUDZBA_STATUS.map((statusNarudzbe) => (<SelectItem value={statusNarudzbe.value}>{statusNarudzbe.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>

      </CardContent>
    </Card>
  )
}

export default OrderItemCard;