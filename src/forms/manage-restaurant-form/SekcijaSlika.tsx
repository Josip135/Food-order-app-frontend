import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const SekcijaSlika = () => {
  const { control, watch } = useFormContext();

  const postojecaSlikaUrl = watch("urlSlike");

  return (
    <div className="space-y-2 py-5 px-10">

      <div>
        <h2 className="text-2-xl font-bold">Slika za restoran</h2>
        <FormDescription>Dodajte sliku koja će biti prikazana za Vaš restoran na aplikaciji. Dodavanje nove slike će izbrisati postojeću!</FormDescription>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {postojecaSlikaUrl && (<AspectRatio ratio={16 / 9}>
          <img src={postojecaSlikaUrl} className="rounded-md object-cover h-full w-full" />
        </AspectRatio>)}

        <FormField control={control} name="imageFile" render={({ field }) => (
          <FormItem>

            <FormControl>
              <Input className="bg-white" type="file" accept=".jpg, .jpeg, .png" onChange={(event) =>
                field.onChange(event.target.files ? event.target.files[0] : null)} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>);
}

export default SekcijaSlika;