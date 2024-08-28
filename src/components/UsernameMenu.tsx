import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {

  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white content-center px-2 py-2 rounded-lg content-start border-solid border-2 border-orange-100 shadow-md">
        <Separator />

        <DropdownMenuItem className="font-bold hover:text-orange-500 rounded-lg mb-2 shadow-md border-solid border-2 border-orange-500 px-1 py-1">
          <Link to="/manage-restaurant" className="mb-10  " >Upravljanje restoranom</Link>
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem className="font-bold hover:text-orange-500 rounded-lg mb-2 shadow-md border-solid border-2 border-orange-500 px-1 py-1">
          <Link to="/user-profile" className="mb-10  " >Profil korisnika</Link>
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem className="content-center">
          <Button onClick={() => logout()} className="w-full flex flex-1 font-bold bg-orange-500">Log Out</Button>
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}

export default UsernameMenu;