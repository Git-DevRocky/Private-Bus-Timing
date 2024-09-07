import { React, createContext, useContext, useState } from "react";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [trip, setTrip] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [dist, setDist] = useState("");

  return (
    <RouteContext.Provider
      value={{
        vehicles,
        setVehicles,
        vehicle,
        setVehicle,
        trip,
        setTrip,
        routes,
        setRoutes,
        schedules,
        setSchedules,
        dist,
        setDist,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
