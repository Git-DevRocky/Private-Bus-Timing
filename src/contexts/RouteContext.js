import { React, createContext, useContext, useState } from "react";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicles] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [trip, setTrip] = useState([]);
  const [routes, setRoutes] = useState([]);
  return (
    <RouteContext.Provider
      value={{
        from,
        setFrom,
        to,
        setTo,
        vehicles,
        vehicle,
        setVehicle,
        trip,
        setTrip,
        routes,
        setRoutes,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
