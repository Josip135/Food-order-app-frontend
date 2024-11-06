import { Narudzba } from "../types";
import { Separator } from "./ui/separator";

type Props = {
  narudzba: Narudzba;
}

const OrderStatusDetail = ({ narudzba }: Props) => {
  return <div className="space-y-5">
    <div className="flex flex-col">
      <span className="font-bold">Dostavlja se: </span>
      <span> {narudzba.detaljiDostave.ime}</span>
      <span>{narudzba.detaljiDostave.adresa}, {narudzba.detaljiDostave.grad}</span>
    </div>

    <div className="flex flex-col">
      <span className="font-bold">Vaša narudžba</span>
      <ul>
        {narudzba.cartItems.map((item) => (
          <li>
            {item.ime} x {item.kolicina}
          </li>
        ))}
      </ul>
    </div>

    <Separator />

    <div className="flex flex-col">
      <span className="font-bold">Ukupno</span>
      <span>{(narudzba.ukupanZbroj / 100).toFixed(2)} €</span>
    </div>

  </div>
}

export default OrderStatusDetail;