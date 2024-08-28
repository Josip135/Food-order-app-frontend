import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import MenuItemInput from "./MenuItemInput";


const MeniSekcija = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jelovnik",
  })

  return (
    <div className="space-y-2 py-5 px-10">
      <div>
        <h2 className="text-2-xl font-bold">Meni</h2>
        <FormDescription>Stvorite svoj meni i dodijelite svakom jelu naziv i cijenu</FormDescription>
      </div>
      <FormField control={control} name="jelovnik" render={() => (
        <FormItem className="flex flex-col gap-2">{fields.map((_, index) => (
          <MenuItemInput index={index} removeJelo={() => remove(index)} />
        ))}
        </FormItem>
      )} />
      <Button type="button" onClick={() => append({ ime: "", cijena: "" })}>Dodajte jelo na meni</Button>
    </div>
  )
}

export default MeniSekcija;