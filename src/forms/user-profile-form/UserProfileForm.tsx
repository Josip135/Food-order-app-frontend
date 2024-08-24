import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import LoadingButton from "../../components/LoadingButon";
import { Button } from "../../components/ui/button";
import { User } from "../../types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  ime: z.string().min(1, "Ime je potrebno"),
  adresa: z.string().min(1, "Adresa je potrebna"),
  grad: z.string().min(1, "Grad je potreban"),
  drzava: z.string().min(1, "Drzava je potrebna"),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
  trenutniKorisnik: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
}

const UserProfileForm = ({ onSave, isLoading, trenutniKorisnik }: Props) => {

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: trenutniKorisnik,
  });

  useEffect(() => {
    form.reset(trenutniKorisnik);
  }, [trenutniKorisnik, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg mg:p-10 px-10 py-5">

        <div>
          <h2 className="text-2xl font-bold text-center">Profil Korisnika</h2>
          <FormDescription className=" text-center">Ovdje možete vidjeti i mijenjati informacije o svom profilu</FormDescription>
        </div>

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} disabled className="bg-white" />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="ime" render={({ field }) => (
          <FormItem>
            <FormLabel>Ime</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />


        <div className="flex flex-col md:flex-row gap-4">

          <FormField control={form.control} name="adresa" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Adresa</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="grad" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Grad</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="drzava" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Država</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        </div>
        {isLoading ? (<LoadingButton />) : (<Button type="submit" className="bg-orange-500">Izmijeni</Button>)}

      </form>
    </Form>
  )
}

export default UserProfileForm; 