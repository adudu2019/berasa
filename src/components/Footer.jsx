import React from "react";
import { GrInstagram } from "react-icons/gr";
import { FaWhatsapp } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <>
      <footer className="bg-black ">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-10 md:mb-0">
              <img
                src="./assets/Black.jpg"
                className="h-12 me-3 ms-5"
                alt="FlowBite Logo"
              />

              <div className="flex flex-col ms-5 sm:justify-center sm:mt-0 gap-3 me-10">
                <p className="flex font-oswald mt-5 text-white gap-2">
                  <GrInstagram size={20} color="#FFFF" className="mt-0.5" />
                  Instagram
                </p>
                <p className="flex font-oswald text-white gap-2">
                  <FaWhatsapp size={20} color="#FFFF" className="mt-0.5" />
                  Whatsapp
                </p>
                <p className="flex font-oswald text-white gap-2 ">
                  <FaYoutube size={20} color="#FFFF" className="mt-0.5" />
                  Youtube
                </p>
                <p className="flex font-oswald text-white gap-2">
                  <FaTiktok size={20} color="#FFFF" className="mt-0.5" />
                  Tiktok
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 me-5">
              <div>
                <h2 className="mb-6 mt-2 me-20 font-oswald text-sm text-lg text-gray-500 uppercase dark:text-white">
                  OUR LOCATION
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <ScrollLink to="location" smooth={false}>
                    <li className="mb-4">
                      <a
                        href="https://flowbite.com/"
                        className="hover:underline font-oswald"
                      >
                        Jakarta
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://tailwindcss.com/"
                        className="hover:underline font-oswald"
                      >
                        Bogor
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tailwindcss.com/"
                        className="hover:underline font-oswald"
                      >
                        Bandung
                      </a>
                    </li>
                  </ScrollLink>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-oswald text-lg mt-2 text-gray-500 uppercase dark:text-white">
                  PARTNERSHIP
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <ScrollLink to="partnership" smooth={false}>
                    <li className="mb-4">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        className="hover:underline font-oswald"
                      >
                        Cibugary
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://discord.gg/4eeurUVvTy"
                        className="hover:underline font-oswald"
                      >
                        Delima
                      </a>
                    </li>
                  </ScrollLink>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-oswald text-lg mt-2 text-gray-500 uppercase dark:text-white">
                  OUR MENU
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <ScrollLink
                    to="foodmenu"
                    smooth={false}
                    className="text-base font-oswald"
                  >
                    <li className="mb-4">
                      <a href="#" className="hover:underline">
                        Food Menu
                      </a>
                    </li>
                  </ScrollLink>
                  <ScrollLink
                    to="drinkmenu"
                    smooth={false}
                    className="text-base font-oswald"
                  >
                    <li>
                      <a href="#" className="hover:underline">
                        Drink Menu
                      </a>
                    </li>
                  </ScrollLink>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center justify-between">
            <span className="text-sm ms-3 text-gray-500 sm:text-center dark:text-gray-400 ">
              © 2024{" "}
              <a
                href="https://flowbite.com/"
                className="hover:underline font-oswald"
              >
                BERASA
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex gap-5 me-5">
              <h2 className="text-sm font-oswald text-white">Privacy Policy</h2>
              <h2 className="text-sm font-oswald text-white">Terms</h2>
              <h2 className="text-sm font-oswald text-white">
                Code of Conduct
              </h2>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
