import { createContext, useState } from "react";

export const LocationContext = createContext({
  location: "",
  setLoc: () => {},
});

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState("");

  const setLoc = (loc) => {
    setLocation(loc);
  };

  return (
    <LocationContext.Provider value={{ location, setLoc }}>
      {children}
    </LocationContext.Provider>
  );
};
