import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./auth/Register";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Comingsoon from "./pages/Comingsoon";
import { supabase } from "./CreateClient";
import { BerasaProvider } from "./utils/berasaContext";
import { useEffect, useState } from "react";
import AuthProvider from "./auth/AuthProvider";
import Profile from "./pages/Profile";
import AuthAdmin from "./auth/AuthAdmin";
import Admin from "./admin/Admin";

import Insert from "./admin/Insert";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Update from "./admin/Update";
import CustomerOrder from "./pages/CustomerOrder";
import History from "./pages/History";
import DetailDrink from "./pages/DetailDrink";
import DetailFood from "./pages/DetailFood";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    setUser(user);
  };
  return (
    <BerasaProvider value={{ user }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comingsoon" element={<Comingsoon />} />
        <Route path="/detaildrink/:id" element={<DetailDrink />} />
        <Route path="/detailfood/:id" element={<DetailFood />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderan" element={<CustomerOrder />} />
        <Route path="/history" element={<History />} />

        <Route element={<AuthAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
      </Routes>
    </BerasaProvider>
  );
}

export default App;
