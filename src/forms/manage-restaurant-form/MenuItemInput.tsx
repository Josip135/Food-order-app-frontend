import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type Props = {
  index: number,
  removeJelo: () => void;
}

const MenuItemInput = ({ index, removeJelo }: Props) => {

  const { control } = useFormContext();

  return (<div className="flex flex-row items-end gap-2">
    <FormField control={control} name={`jelovnik.${index}.ime`} render={({ field }) =>
      <FormItem>
        <FormLabel className="flex items-center gap-1">Naziv <FormMessage /></FormLabel>
        <FormControl >
          <Input {...field} placeholder="Pizza margarita" className="bg-white" />
        </FormControl>
      </FormItem>} />

    <FormField control={control} name={`jelovnik.${index}.cijena`} render={({ field }) =>
      <FormItem>
        <FormLabel className="flex items-center gap-1">Cijena (€)<FormMessage /></FormLabel>
        <FormControl >
          <Input {...field} placeholder="8.50" className="bg-white" />
        </FormControl>
      </FormItem>} />

    <Button type="button" onClick={removeJelo} className="bg-red-500 max-h-fit">Ukloni</Button>
  </div>);
}

export default MenuItemInput;