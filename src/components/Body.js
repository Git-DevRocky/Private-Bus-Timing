import React from "react";

import { useRoute } from "../contexts/RouteContext";
import jsonData from "../data/data.json";
import { useNavigate } from "react-router-dom";

function Body() {
  const { from, to, vehicles, setVehicle, setRoutes, setTrip } = useRoute();
  const schedules = jsonData.busSchedules;
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const navigate = useNavigate();
  schedules.filter((schedule) => {
    if (schedule.route.includes(from) && schedule.route.includes(to)) {
      vehicles.push(schedule["Vehicle Number"]);
      setTrip(schedule);
      setRoutes(schedule.route);
    }
    return "";
  });

  const handleClick = (v) => {
    setVehicle(v);
    navigate("/schedule");
  };

  return (
    <div className="flex w-full  flex-col bg-white h-[90vh] ">
      <p className="text-center text-small lg:text-2xl underline font-bold uppercase">
        Route Details -PATHANAMTHITTA
      </p>
      <div className="flex  p-3 m-3 h-5/6 flex-col lg:flex-row">
        <div className=" p-2  lg:w-1/2 shadow-md md:w-full   h-full flex flex-col m-1 overflow-y-auto items-center">
          <div className="flex items-center w-full flex-col lg:flex-row">
            <img
              src="https://img.freepik.com/premium-vector/logo-bus-icon-vector-silhouette-isolated-design-school-bus-concept-black-icon_653669-3331.jpg?w=740"
              alt=""
              width={400}
              height={400}
            />
            <div className="flex flex-col items-center w-1/2">
              <h1 className="text-2xl font-semibold text-green-800">{from}</h1>
              <h1 className="2xl font-bold">TO</h1>
              <h1 className="text-2xl font-semibold text-red-800">{to}</h1>
            </div>
          </div>
          <div className="text-small font-bold p-2 bg-slate-100 shadow-xl rounded-md flex flex-col items-center justify-center ">
            <h1 className="p-1 m-1 ">{currDate}</h1>
            <h1 className="p-1 m-1 ">{currTime}</h1>
          </div>
        </div>
        <div className="   lg:w-1/2 shadow-md md:w-full h-[100vh] lg:h-full m-1 overflow-y-auto p-4">
          <h1 className="sticky top-0 z-100 bg-blue-800 bg-opacity-94  text-white p-3">{`Bus's Travelling through ${from} to ${to}`}</h1>
          <div className="p-3 ">
            {vehicles?.map((v) => (
              <div className="flex bg-gray-200 p-3 hover:shadow-sm cursor-pointer m-1 justify-between">
                <h1 className="font-bold text-green-600" key={v.id}>
                  {v} :
                </h1>

                <button
                  className="bg-blue-800 hover:bg-blue-600 text-white rounded-md px-3 py-1"
                  onClick={() => handleClick(v)}
                >
                  View Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
