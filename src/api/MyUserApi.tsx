import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getmyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Problem pri preuzimanju korisničkih podataka!");
    }

    return response.json();
  };

  const { data: trenutniKorisnik, isLoading, error } = useQuery("fetchCurrentUser", getmyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { trenutniKorisnik, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
}

export const useCreateMyUser = () => {

  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Neuspjeh pri stvaranju korisnika!");
    }
  };

  const { mutateAsync: createUser, isLoading, isError, isSuccess, } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  ime: string;
  adresa: string;
  grad: string;
  drzava: string;
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Greška pri izmijeni podataka!");
    }

    return response.json();

  };

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset, } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("Profil korisnika izmijenjen!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};