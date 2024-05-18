import React from "react";

function LoadingBar() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg bg-black text-neutral-50"></span>
    </div>
  );
}

export default LoadingBar;
