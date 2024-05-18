import React, { useContext, useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { BerasaContext } from "../utils/berasaContext";
import { MdShoppingCart } from "react-icons/md";
import { supabase } from "../CreateClient";
import { Spin as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useContext(BerasaContext);
  console.log(user.user);

  const [getTotalCart, setGetTotalCart] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const totalCart = async () => {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_user", user.user.id);
    setGetTotalCart(data.length);
    console.log(data.length);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    setDarkMode(currentTheme === "light");
    document.body.setAttribute("data-theme", currentTheme);
    totalCart();
  }, []);

  const handleToggle = () => {
    const newTheme = darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start ms-5">
          <img src="/assets/Berasa.jpg" className="h-8 w-28" />
        </div>
        <div className="navbar-center max-sm:hidden">
          <ul className="menu menu-horizontal gap-5">
            <li>
              <ScrollLink
                to="home"
                smooth={false}
                className="text-base font-oswald"
              >
                HOME
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to="partnership"
                smooth={false}
                className="text-base font-oswald"
              >
                PARTNERSHIP
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to="foodmenu"
                smooth={false}
                className="text-base font-oswald"
              >
                FOOD MENU
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="drinkmenu"
                smooth={false}
                className="text-base font-oswald"
              >
                DRINK MENU
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="location"
                smooth={false}
                className="text-base font-oswald"
              >
                OUR LOCATION
              </ScrollLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate me-5">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleToggle} // Mengubah mode tema saat tombol di klik
            />
            {/* moon icon */}
            <svg
              className="swap-on fill-black w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>

            {/* sun icon */}
            <svg
              className="swap-off fill-black w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label>
          {user.user !== null ? (
            <>
              <Link to={"/cart"}>
                <div className="indicator mt-2 me-6">
                  <MdShoppingCart size={24}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </MdShoppingCart>

                  <span className="badge badge-sm indicator-item text-black font-oswald">
                    {getTotalCart}
                  </span>
                </div>
              </Link>
              {/* <Link to={"/profile"}> */}
              <Link to={"/Profile"}>
                <div className="dropdown dropdown-end me-3 max-sm:hidden">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                </div>
              </Link>
              {/* </Link> */}
              <div className="sm:hidden">
                <Hamburger toggled={isOpen} toggle={setOpen} />

                {isOpen ? (
                  <>
                    <div className="z-20 absolute w-full left-0 flex flex-col text-white items-center gap-5 bg-slate-900 p-5 mt-5">
                      <a href="#home">HOME</a>
                      <a href="#partnership">PARTNERSHIP</a>
                      <a href="#foodmenu">FOOD MENU</a>
                      <a href="#drinkmenu">DRINK MENU</a>
                      <a href="#location">LOCATION</a>
                      <Link to={"/Profile"}>PROFILE</Link>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="me-5">
                  <div className="indicator text-sm">LOG IN</div>
                </button>
              </Link>

              <Link to={"/register"}>
                <button className="btn me-4 p-2 bg-black text-white hover:bg-gray-400">
                  <div className="">REGISTER</div>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
