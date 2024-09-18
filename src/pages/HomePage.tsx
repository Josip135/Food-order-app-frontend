import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    })
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="mr-7 ml-7  md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 mr-40 ml-40">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">Zavali se u kauč i naruči!</h1>

        <span className="text-xl">Par klikova i hrana je kod tebe!</span>
        <SearchBar placeHolder="Pretražite restorane po gradu" onSubmit={handleSearchSubmit} />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">Naruči još brže preko mobitela!</span>

          <span>Instaliraj Jedi.hr i ostvari popuste i pronađi nove restorane!</span>

          <img src={appDownloadImage} />
        </div>

      </div>
    </div>)
}

export default HomePage;