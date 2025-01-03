import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Narudzba, Restoran } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurant = async (): Promise<Restoran> => {

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Problem pri preuzimanju podataka o restoranu!");
    }

    return response.json();
  };

  const { data: restoran, isLoading } = useQuery("fetchRestoran", getMyRestaurant);

  return { restoran, isLoading };
}

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restoran> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Greška pri stvaranju restorana!");
    }

    return response.json();
  };

  const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restoran stvoren!");
  }
  if (error) {
    toast.error("Nemoguće stvoriti restoran!");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restoran> => {

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Greška pri izmijeni restorana!");
    }

    return response.json();
  };

  const { mutate: updateRestaurant, isLoading, error, isSuccess } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restoran izmijenjen!");
  }
  if (error) {
    toast.error("Nemoguće izmijeniti restoran!");
  }

  return { updateRestaurant, isLoading };
}

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Narudzba[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/narudzba`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Greška pri hvatanju narudžbi!")
    }

    return response.json();
  }

  const { data: narudzbe, isLoading } = useQuery("fetchMYRestaurantOrders", getMyRestaurantOrdersRequest)

  return { narudzbe, isLoading }
}

type UpdateStatusNarudzbeRequest = {
  narudzbaId: string;
  status: string;
}

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (updateStatusNarudzbeRequest: UpdateStatusNarudzbeRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/narudzba/${updateStatusNarudzbeRequest.narudzbaId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: updateStatusNarudzbeRequest.status }),
    }
    );

    if (!response.ok) {
      throw new Error("Greška pri izmjeni statusa narudžbe!")
    }

    return response.json();
  }

  const { mutateAsync: updateRestaurantStatus, isLoading, isError, isSuccess, reset } = useMutation(updateMyRestaurantOrder)

  if (isSuccess) {
    toast.success("Narudžba izmijenjena!");
  }

  if (isError) {
    toast.error("Nemoguće izmijeniti narudžbu!");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
}