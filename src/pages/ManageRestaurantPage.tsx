import { TabsContent } from "@radix-ui/react-tabs";
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "../api/MyRestaurantApi";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";
import OrderItemCard from "../components/OrderItemCard";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();

  const { restoran } = useGetMyRestaurant();

  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  const { narudzbe } = useGetMyRestaurantOrders();

  const isEditing = !!restoran;

  const brojNarudzbi = () => {
    if (narudzbe?.length === 1) {
      return <> {narudzbe?.length} aktivna narudžba</>
    } else {
      return <> {narudzbe?.length} aktivne narudžbe</>
    }
  }

  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="narudzbe">
          Narudzbe
        </TabsTrigger>

        <TabsTrigger value="manage-restaurant">
          Upravljanje restoranom
        </TabsTrigger>
      </TabsList>

      <TabsContent value="narudzbe" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
        <h2 className="text-2xl font-bold"> {brojNarudzbi()} </h2>
        {narudzbe?.map((narudzba) => (<OrderItemCard narudzba={narudzba} />))}
      </TabsContent>

      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm restoran={restoran}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>

  );
}

export default ManageRestaurantPage;