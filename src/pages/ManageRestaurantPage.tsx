import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "../api/MyRestaurantApi";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();

  const { restoran } = useGetMyRestaurant();

  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  const isEditing = !!restoran;

  return (<ManageRestaurantForm restoran={restoran} onSave={isEditing ? updateRestaurant : createRestaurant} isLoading={isCreateLoading || isUpdateLoading} />);
}

export default ManageRestaurantPage;