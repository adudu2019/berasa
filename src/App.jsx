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
import Detail from "./pages/Detail";
import Insert from "./admin/Insert";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Update from "./admin/Update";
import CustomerOrder from "./pages/CustomerOrder";
import History from "./pages/History";

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
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Comingsoon" element={<Comingsoon />} />
        <Route path="/detail/:id" element={<Detail />} />
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
