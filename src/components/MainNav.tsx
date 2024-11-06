import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";


const MainNav = () => {

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">

      {isAuthenticated ? (
        <>
          <Link to="/narudzba-status" className="font-bold hover:text-orange-500">Status narudžbe</Link>
          <UsernameMenu />
        </>
      ) :
        (<Button variant="ghost" className="font-bold hover:text-orange-500 hover:bg-white" onClick={async () => await loginWithRedirect()}>
          Log in
        </Button>)}
    </span>
  )
}

export default MainNav;

//variant="ghost" miče većinu stilova komponente tako da korisnik može dodati svoje