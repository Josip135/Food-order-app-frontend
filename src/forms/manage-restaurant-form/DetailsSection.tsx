import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const DetailsSection = () => {
  const { control } = useFormContext();
  //w-[800px] space-y-4 py-10 px-10 space-y-4
  return (<div className=" space-y-2 py-5 px-10">
    <div>
      <h2 className="text-2-xl font-bold">Detalji</h2>
      <FormDescription>
        Unesite detalje o svom restoranu!
      </FormDescription>
    </div>

    <FormField control={control} name="imeRestorana" render={({ field }) => (<FormItem>
      <FormLabel>Ime</FormLabel>
      <FormControl>
        <Input {...field} className="bg-white" />
      </FormControl>
      <FormMessage />
    </FormItem>)} />

    <div className="flex gap-4">
      <FormField control={control} name="grad" render={({ field }) => (<FormItem className="flex-1">
        <FormLabel>Grad</FormLabel>
        <FormControl>
          <Input {...field} className="bg-white" />
        </FormControl>
        <FormMessage />
      </FormItem>)} />

      <FormField control={control} name="drzava" render={({ field }) => (<FormItem className="flex-1">
        <FormLabel>Država</FormLabel>
        <FormControl>
          <Input {...field} className="bg-white" />
        </FormControl>
        <FormMessage />
      </FormItem>)} />
    </div>

    <FormField control={control} name="cijenaDostave" render={({ field }) => (<FormItem className="max-w-[25%]">
      <FormLabel>Cijena dostave (€)</FormLabel>
      <FormControl>
        <Input {...field} className="bg-white" placeholder="1.50" />
      </FormControl>
      <FormMessage />
    </FormItem>)} />

    <FormField control={control} name="procijenjenoVrijemeDostave" render={({ field }) => (<FormItem className="max-w-[25%]">
      <FormLabel>Procijenjeno vrijeme dostave (u minutama)</FormLabel>
      <FormControl>
        <Input {...field} className="bg-white" placeholder="30" />
      </FormControl>
      <FormMessage />
    </FormItem>)} />

  </div>)
}

export default DetailsSection;