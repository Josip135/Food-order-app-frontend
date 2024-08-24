import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroBurger from "../components/HeroBurger";

type Props = {
  children: React.ReactNode;
  showHeroBurger?: boolean;
}

const Layout = ({ children, showHeroBurger = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHeroBurger && <HeroBurger />}

      <div className="comtainer mx-auto flex-1 py-10">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout;