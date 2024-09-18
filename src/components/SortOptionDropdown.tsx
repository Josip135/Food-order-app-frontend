import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
}

const sort_options = [
  {
    label: "Najboljoj opciji",
    value: "najboljaOpcija"
  },
  {
    label: "Cijeni dostave",
    value: "cijenaDostave"
  },
  {
    label: "Procijenjenom vremenu dostave",
    value: "procijenjenoVrijemeDostave"
  },
]

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {

  const selectedSortLabel = sort_options.find((opcija) => opcija.value === sortOption)?.label || sort_options[0].label;

  return (<DropdownMenu>
    <DropdownMenuTrigger className="cursor-pointer">
      <Button variant="outline" className="w-full font-bold hover:text-slate-500">Sortirajte prema: {selectedSortLabel}</Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>{sort_options.map((opcija) => (
      <DropdownMenuItem className="mt-1 cursor-pointer flex items-center justify-center bg-white font-semibold text-black-900 hover:text-orange-500 border-solid border-2 border-slate-200 shadow-md rounded-lg w-full py-1 hover:border-slate-500" onClick={() => onChange(opcija.value)}>
        {opcija.label}
      </DropdownMenuItem>
    ))}</DropdownMenuContent>
  </DropdownMenu>)
}

export default SortOptionDropdown;