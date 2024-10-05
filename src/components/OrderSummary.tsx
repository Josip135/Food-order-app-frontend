import { Trash } from "lucide-react";
import { CartItem } from "../pages/DetailPage";
import { Restoran } from "../types";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
  restoran: Restoran;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
}

const OrderSummary = ({ restoran, cartItems, removeFromCart }: Props) => {

  const getTotalCost = () => {
    const totalInCents = cartItems.reduce((total, cartItem) => total + cartItem.cijena * cartItem.kolicina, 0);

    const totalSaDostavom = totalInCents + restoran.cijenaDostave

    return (totalSaDostavom / 100).toFixed(2);
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Vaša narudžba </span>

          <span> {getTotalCost()} €</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.kolicina}
              </Badge>
              {item.ime}
            </span>
            <span className="flex items-center gap-1">
              <Trash className="cursor-pointer" color="red" size={20} onClick={() => removeFromCart(item)} />
              {((item.cijena * item.kolicina) / 100).toFixed(2)} €
            </span>
          </div>
        ))}

        <Separator />
        <div className="flex justify-between">
          <span>Dostava</span>
          <span>{(restoran.cijenaDostave / 100).toFixed(2)}€</span>
        </div>
        <Separator />

      </CardContent>
    </>
  )
}

export default OrderSummary;