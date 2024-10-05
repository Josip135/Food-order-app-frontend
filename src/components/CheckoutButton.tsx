import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButon";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "../forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "../api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
}

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {

  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();

  const { trenutniKorisnik, isLoading: isGetUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    })
  }

  if (!isAuthenticated) {
    return (<Button onClick={onLogin} className="bg-orange-500 flex-1">Ulogirajte se za narudžbu!</Button>);
  }

  if (isAuthLoading || !trenutniKorisnik || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Potvrdite narudžbu!
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm trenutniKorisnik={trenutniKorisnik} onSave={onCheckout} isLoading={isGetUserLoading} title="Potvrdite detalje dostave" buttonText="Nastavite sa plaćanjem" />
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutButton;