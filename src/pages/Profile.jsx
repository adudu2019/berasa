import React from "react";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, username, role } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      if (!error) {
        alert("Berhasil Logout");
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <img src="./assets/back.png" alt="" className="absolute" />

      {role === "admin" ? (
        <>
          <div className="flex flex-col mt-16 h-[60vh]">
            <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
              <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                  className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                />
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jefri_Nichol_in_2019.png/220px-Jefri_Nichol_in_2019.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700 dark:text-black">
                  {username}
                </h4>
                <p className="text-base font-normal text-gray-600">Admin</p>
              </div>
              <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-black">
                    17
                  </p>
                  <p className="text-sm font-normal text-gray-600">Posts</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-black">
                    9.7K
                  </p>
                  <p className="text-sm font-normal text-gray-600">Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-black">
                    434
                  </p>
                  <p className="text-sm font-normal text-gray-600">Following</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border-2 border-black mt-2 p-2 w-32 text-black hover:bg-slate-500 rounded-md "
              onClick={handleLogout}
            >
              Logout
            </button>

            <button
              className=" border-2 border-black mt-2 ms-2 p-2 w-32 text-black hover:bg-slate-500 rounded-md"
              onClick={() => navigate("/admin")}
            >
              {" "}
              Admin
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col mt-16 h-[60vh]">
            <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
              <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                  className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                />
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jefri_Nichol_in_2019.png/220px-Jefri_Nichol_in_2019.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700 dark:text-black">
                  {username}
                </h4>
                <p className="text-base font-normal text-gray-600">Pengguna</p>
              </div>
              <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-black">
                    17
                  </p>
                  <p className="text-sm font-normal text-gray-600">Posts</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-black">
                    9.7K
                  </p>
                  <p className="text-sm font-normal text-gray-600">Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-black">
                    434
                  </p>
                  <p className="text-sm font-normal text-gray-600">Following</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border-2 border-black mt-2 p-2 w-32 text-black hover:bg-slate-500 rounded-md "
              onClick={handleLogout}
            >
              Logout
            </button>

            <button
              className=" border-2 border-black mt-2 ms-2 p-2 w-32 text-black hover:bg-slate-500 rounded-md"
              onClick={() => navigate("/history")}
            >
              {" "}
              History
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
