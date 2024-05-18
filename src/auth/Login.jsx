import React, { useRef } from "react";
import { supabase } from "../CreateClient";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    try {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithPassword({
        email: emailValue,
        password: passwordValue,
      });

      if (error) {
        alert(" Login Gagal ");
      }

      if (user && session) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
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
              Sign In to your account
            </h1>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                />
              </div>

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-black border hover:bg-slate-500 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <i className="fa-brands fa-google"></i>
                <span className="ml-4">Log In with Google</span>
              </div>
            </button>

            <p className="mt-8">
              Need an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
