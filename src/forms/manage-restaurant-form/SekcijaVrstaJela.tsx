import { useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { vrsteJelaLista } from "../../config/restaurant-options-config";
import VrstaJelaCheckbox from "./VrstaJelaCheckbox";

const SekcijaVrstaJela = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2 py-5 px-10">
      <div>
        <h2 className="text-2-xl font-bold">Vrsta jela</h2>
        <FormDescription>Odaberite vrstu jela koje Vaš restoran poslužuje</FormDescription>
      </div>
      <FormField control={control} name="vrsteJela" render={({ field }) => (
        <FormItem>
          <div className="grid md:grid-cols-5 gap-1">{vrsteJelaLista.map((vrstaJela) => <VrstaJelaCheckbox jelo={vrstaJela} field={field} />)}</div>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  )
}

export default SekcijaVrstaJela;