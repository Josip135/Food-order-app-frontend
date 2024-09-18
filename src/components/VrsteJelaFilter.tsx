import { Label } from "@radix-ui/react-label";
import { vrsteJelaLista } from "../config/restaurant-options-config";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (vrsteJela: string[]) => void;
  odabranaVrstaJela: string[]
  isExpanded: boolean;
  onExpandedClick: () => void;
}

const VrsteJelaFilter = ({ onChange, odabranaVrstaJela, isExpanded, onExpandedClick }: Props) => {

  const handleVrsteJelaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedVrstaJela = event.target.value;
    const isChecked = event.target.checked;

    const novaListaVrstaJela = isChecked ? [...odabranaVrstaJela, clickedVrstaJela] : odabranaVrstaJela.filter((vrstaJela) => vrstaJela !== clickedVrstaJela);

    onChange(novaListaVrstaJela);
  }

  const handleVrsteJelaReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filtrirajte po vrsti jela</div>
        <div onClick={handleVrsteJelaReset} className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">Resetiraj filter</div>
      </div>

      <div className="space-y-2 flex flex-col">
        {vrsteJelaLista.slice(0, isExpanded ? vrsteJelaLista.length : 7).map((vrstaJela) => {
          const isSelected = odabranaVrstaJela.includes(vrstaJela);
          return <div className="flex">
            <input id={`vrstaJela_${vrstaJela}`} type="checkbox" className="hidden" value={vrstaJela} checked={isSelected} onChange={handleVrsteJelaChange} />
            <Label htmlFor={`vrstaJela_${vrstaJela}`} className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 text-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`}>
              {isSelected && <Check size={20} strokeWidth={3} />}
              {vrstaJela}
            </Label>
          </div>
        })}

        <Button onClick={onExpandedClick} variant="link" className="mt-4 flex-1">
          {isExpanded ? (<span className="flex flex-row items-center">Prikaži manje <ChevronUp /></span>) : (<span className="flex flex-row items-center">Prikaži više <ChevronDown /></span>)}
        </Button>
      </div>
    </>
  )
}

export default VrsteJelaFilter;