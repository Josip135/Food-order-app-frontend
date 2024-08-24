import { useGetMyUser, useUpdateMyUser } from "../api/MyUserApi";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {

  const { trenutniKorisnik, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return (<span>Učitavanje...</span>);
  }

  if (!trenutniKorisnik) {
    return (<span>Nije moguće učitati profil korisnika!</span>);
  }

  return (
    <UserProfileForm trenutniKorisnik={trenutniKorisnik} onSave={updateUser} isLoading={isUpdateLoading} />
  );
}

export default UserProfilePage;