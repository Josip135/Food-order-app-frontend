import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import SekcijaVrstaJela from "./SekcijaVrstaJela";
import MeniSekcija from "./MeniSekcija";
import SekcijaSlika from "./SekcijaSlika";
import LoadingButton from "../../components/LoadingButon";
import { Button } from "../../components/ui/button";
import { Restoran } from "../../types";
import { useEffect } from "react";

const formSchema = z.object({
  imeRestorana: z.string({
    required_error: "Ime restorana je potrebno!",
  }),

  grad: z.string({
    required_error: "Ime grada je potrebno!",
  }),

  drzava: z.string({
    required_error: "Ime drzave je potrebno!",
  }),

  cijenaDostave: z.coerce.number({
    required_error: "Cijena dostave je potrebna!",
    invalid_type_error: "Cijena dostave mora biti pozitivan broj!",
  }),

  procijenjenoVrijemeDostave: z.coerce.number({
    required_error: "Procijenjeno vrijeme dostave je potrebno!",
    invalid_type_error: "Procijenjeno vrijeme dostave mora biti pozitivan broj!",
  }),

  vrsteJela: z.array(z.string()).nonempty({
    message: "Molimo odaberite barem jednu vrstu jela!",
  }),

  jelovnik: z.array(z.object({
    ime: z.string().min(1, "Ime jela je potrebo!"),
    cijena: z.coerce.number().min(1, "Cijena jela je potrebna!"),
  })),

  urlSlike: z.string().optional(),

  imageFile: z.instanceof(File, { message: "Slika je potrebna!" }).optional(),
})
  .refine((data) => data.urlSlike || data.imageFile, {
    message: "Ili url slike ili datoteka moraju biti predani!",
    path: ["imageFile"],

  });

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  restoran?: Restoran;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restoran }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vrsteJela: [],
      jelovnik: [{ ime: "", cijena: 0 }],
    },
  });

  useEffect(() => {
    if (!restoran) {
      return;
    }

    const cijenaDostaveFormatirana = parseInt((restoran.cijenaDostave / 100).toFixed(2));

    const jelovnikFormatiran = restoran.jelovnik.map((jelo) => ({
      ...jelo,
      cijena: parseInt((jelo.cijena / 100).toFixed(2)),
    }));

    const izmijenjenRestoran = {
      ...restoran,
      cijenaDostave: cijenaDostaveFormatirana,
      jelovnik: jelovnikFormatiran,
    };

    form.reset(izmijenjenRestoran);

  }, [form, restoran]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    //TO DO - convert formDataJson to a new FormData object!
    const formData = new FormData();

    formData.append("imeRestorana", formDataJson.imeRestorana);
    formData.append("grad", formDataJson.grad);
    formData.append("drzava", formDataJson.drzava);

    formData.append("cijenaDostave", (formDataJson.cijenaDostave * 100).toString());
    formData.append("procijenjenoVrijemeDostave", formDataJson.procijenjenoVrijemeDostave.toString());

    formDataJson.vrsteJela.forEach((vrsta, index) => {
      formData.append(`vrsteJela[${index}]`, vrsta);
    });

    formDataJson.jelovnik.forEach((jelovnik, index) => {
      formData.append(`jelovnik[${index}][ime]`, jelovnik.ime);
      formData.append(`jelovnik[${index}][cijena]`, (jelovnik.cijena * 100).toString());
    });

    if (formDataJson.imageFile) {
      formData.append('imageFile', formDataJson.imageFile);
    }


    onSave(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 rounded-lg">
        <DetailsSection />
        <Separator />

        <SekcijaVrstaJela />
        <Separator />

        <MeniSekcija />
        <Separator />

        <SekcijaSlika />

        {isLoading ? <LoadingButton /> : <Button type="submit">Dodaj</Button>}
      </form>
    </Form >
  )
}

export default ManageRestaurantForm;