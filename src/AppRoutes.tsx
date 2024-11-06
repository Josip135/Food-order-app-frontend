import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import ZasticenaRuta from "./auth/ZasticenaRuta.tsx";
import ManageRestaurantPage from "./pages/ManageRestaurantPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import OrderStatusPage from "./pages/OrderStatusPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Layout showHeroBurger>
          <HomePage />
        </Layout>} />

      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route path="/search/:grad" element={<Layout showHeroBurger={false}>
        <SearchPage />
      </Layout>} />

      <Route path="/detail/:restoranId" element={<Layout showHeroBurger={false}>
        <DetailPage />
      </Layout>} />

      <Route element={<ZasticenaRuta />}>
        <Route path="/narudzba-status" element={<Layout>
          <OrderStatusPage />
        </Layout>} />
      </Route>

      <Route element={<ZasticenaRuta />}>
        <Route path="/user-profile" element={<Layout>
          <UserProfilePage />
        </Layout>} />
      </Route>

      <Route element={<ZasticenaRuta />}>
        <Route path="/manage-restaurant" element={<Layout>
          <ManageRestaurantPage />
        </Layout>} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes;