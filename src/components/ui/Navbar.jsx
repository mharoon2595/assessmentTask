import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 flex justify-evenly items-center p-3 bg-slate-300 shadow-lg">
      <h1 className="font-bold italic text-xl">Weather4All</h1>
      <button
        onClick={() => navigate("/")}
        className="p-2 bg-teal-400 font-bold rounded-md"
      >
        Home
      </button>
    </div>
  );
};

export default Navbar;
