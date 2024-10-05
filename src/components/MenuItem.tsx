import { Jelo } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  jelo: Jelo;
  addToCart: () => void;
}

const MenuItem = ({ jelo, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>
          {jelo.ime}
        </CardTitle>
      </CardHeader>

      <CardContent className="font-bold">
        {(jelo.cijena / 100).toFixed(2)} €
      </CardContent>
    </Card>
  )
}

export default MenuItem;