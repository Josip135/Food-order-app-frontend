import { useParams } from "react-router-dom";
import { useGetRestaurants } from "../api/RestaurantApi";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import RestoranInfo from "../components/RestoranInfo";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";
import { Jelo } from "../types";
import CheckoutButton from "../components/CheckoutButton";
import { UserFormData } from "../forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "../api/OrderApi";

export type CartItem = {
  _id: string;
  ime: string;
  cijena: number;
  kolicina: number;
}

const DetailPage = () => {
  const { restoranId } = useParams();
  const { restoran, isLoading } = useGetRestaurants(restoranId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restoranId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }); //inicijaliziranje praznog polja 

  const addToCart = (jelo: Jelo) => {

    setCartItems((prevCartItems) => {
      //1. Provjera jeli jelo već u košarici
      const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === jelo._id);

      let updatedCartItems;
      //2. Ako je jelo u košarici, promijeni količinu
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === jelo._id ? { ...cartItem, kolicina: cartItem.kolicina + 1 } : cartItem);
      } else {
        updatedCartItems = [
          ...prevCartItems, {
            _id: jelo._id,
            ime: jelo.ime,
            cijena: jelo.cijena,
            kolicina: 1,
          }
        ]
      }

      //pohrana jela u košarici u korisničku sesiju
      sessionStorage.setItem(`cartItems-${restoranId}`, JSON.stringify(updatedCartItems));

      //3. Ako jelo nije u u košarici dodaj ga kao novo jelo
      return updatedCartItems;
    })
  }

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((previousCartItems) => {
      const updatedCartItems = previousCartItems.filter((item) => cartItem._id !== item._id);

      sessionStorage.setItem(`cartItems-${restoranId}`, JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  }

  const onCheckout = async (userFormData: UserFormData) => {
    //console.log("userFormData", userFormData);

    if (!restoran) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        jeloId: cartItem._id,
        ime: cartItem.ime,
        kolicina: cartItem.kolicina.toString(),
      })),
      restoranId: restoran._id,
      detaljiDostave: {
        ime: userFormData.ime,
        adresa: userFormData.adresa,
        grad: userFormData.grad,
        drzava: userFormData.drzava,
        email: userFormData.email as string
      }
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  }

  if (isLoading || !restoran) {
    return "Učitavanje...";
  }

  return (<div className="flex flex-col gap-10">
    <AspectRatio ratio={16 / 5}>
      <img src={restoran.urlSlike} className="rounded-md object-cover h-full w-full" />
    </AspectRatio>

    <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
      <div className="flex flex-col gap-4">
        <RestoranInfo restoran={restoran} />
        <span className="text-2xl font-bold tracking-tight">Meni</span>
        {restoran.jelovnik.map((jelo) => (
          <MenuItem jelo={jelo} addToCart={() => addToCart(jelo)} />
        ))}
      </div>

      <div>
        <Card>
          <OrderSummary restoran={restoran} cartItems={cartItems} removeFromCart={removeFromCart} />

          <CardFooter>
            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCheckoutLoading} />

          </CardFooter>
        </Card>
      </div>

    </div>
  </div>)
}

export default DetailPage;