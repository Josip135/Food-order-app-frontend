import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {

  const { logout } = useAuth0();

  return (<div>
    <Link to="/manage-restaurant" className="flex items-center justify-center bg-white font-bold text-black-900 hover:text-orange-500 mb-2 border-solid border-2 border-orange-200 shadow-md rounded-lg w-full py-1 hover:border-orange-500" >Upravljanje restoranom</Link>

    <Link to="/narudzba-status" className="flex items-center justify-center bg-white font-bold text-black-900 hover:text-orange-500 mb-2 border-solid border-2 border-orange-200 shadow-md rounded-lg w-full py-1 hover:border-orange-500">Status narudžbe</Link>

    <Link to="/user-profile" className="flex items-center justify-center bg-white font-bold text-black-900 hover:text-orange-500 mb-2 border-solid border-2 border-orange-200 shadow-md rounded-lg w-full py-1 hover:border-orange-500">Profil Korisnika</Link>

    <Button onClick={() => logout()} className="flex items-center px-3 font-bold hover:bg-gray-500 w-full">Log Out</Button>
  </div>

  )
}

export default MobileNavLinks;