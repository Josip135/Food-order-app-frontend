
import { useGetMyOrders } from "../api/OrderApi";
import OrderStatusDetail from "../components/OrderStatusDetail";
import OrderStatusHeader from "../components/OrderStatusHeader";
import { AspectRatio } from "../components/ui/aspect-ratio";


const OrderStatusPage = () => {
  const { narudzbe, isLoading } = useGetMyOrders();

  if (isLoading) {
    return "Učitavanje...";
  }

  if (!narudzbe || narudzbe.length === 0) {
    return "Nema narudžbi";
  }

  return (
    <div className="space-y-10">
      {narudzbe.map((narudzba) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader narudzba={narudzba} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail narudzba={narudzba} />
            <AspectRatio ratio={16 / 5}>
              <img src={narudzba.restoran.urlSlike} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderStatusPage;