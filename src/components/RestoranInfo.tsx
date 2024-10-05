import { Dot } from "lucide-react";
import { Restoran } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type Props = {
  restoran: Restoran;
}

const RestoranInfo = ({ restoran }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restoran.imeRestorana}
        </CardTitle>
        <CardDescription>
          {restoran.grad}, {restoran.drzava}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex">
        {restoran.vrsteJela.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restoran.vrsteJela.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}

export default RestoranInfo;