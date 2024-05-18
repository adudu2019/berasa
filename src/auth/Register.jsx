import React, { useRef } from "react";
import { supabase } from "../CreateClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  const navigate = useNavigate();
  let confirmPass;
  const handleSubmitButton = async (e, email, pass) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      alert("Password tidak sama");
      return;
    }

    const { user, session, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passRef.current.value,
    });
    if (!error) {
      navigate("/");
    } else {
      alert("Registrasi gagal");
      console.error(error);
      return;
    }
  };
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://img.freepik.com/free-photo/delicious-food-table-view_23-2149139520.jpg?w=826&t=st=1699537458~exp=1699538058~hmac=a64545d3bdbbf15f368295b83b56ad5ef3f78b32f100f2d193af623619d187b8"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Register your account
            </h1>

            <form className="mt-6" onSubmit={handleSubmitButton}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  ref={emailRef}
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name=""
                  id=""
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                  ref={passRef}
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                  ref={confirmPassRef}
                />
              </div>

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Have an account? Login
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-black hover:bg-slate-500 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Register
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <i className="fa-brands fa-google"></i>
                <span className="ml-4">Register with Google</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
