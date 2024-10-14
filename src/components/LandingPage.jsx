import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationContext } from "./utils/Context";

const LandingPage = () => {
  const { location, setLoc } = useContext(LocationContext);
  const navigate = useNavigate();

  let submitHandler = (e) => {
    e.preventDefault();

    let form = new FormData(e.target);

    setLoc(form.get("location"));
    navigate("/data");
  };

  return (
    <section className="h-[90vh] flex items-center justify-center">
      <form
        className="flex flex-col p-3 gap-3 border border-black rounded-lg"
        onSubmit={(e) => submitHandler(e)}
      >
        <label htmlFor="location" className="md:text-xl">
          Find the weather forecast for any city worldwide
        </label>
        <input
          name="location"
          type="text"
          placeholder="Name of the city"
          className="p-2 border border-black rounded-md"
          required
        />
        <button type="submit" className="p-2 bg-green-500 rounded-md">
          Search
        </button>
      </form>
    </section>
  );
};

export default LandingPage;
