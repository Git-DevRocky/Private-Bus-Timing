import React, { useEffect } from "react";

import { useRoute } from "../contexts/RouteContext";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
function Body() {
  const { dist } = useRoute();

  const {
    from,
    to,
    setFrom,
    setTo,
    vehicles,
    setVehicles,
    setVehicle,
    setRoutes,
    setTrip,
  } = useRoute();

  const { schedules, setSchedules } = useRoute();

  const navigate = useNavigate();
  schedules.filter((schedule) => {
    if (schedule.route.includes(from) && schedule.route.includes(to)) {
      vehicles.push(schedule["Vehicle Number"]);
      setTrip(schedule);

      setRoutes(schedule.route);
    }
    return "";
  });

  useEffect(() => {
    setVehicles([]);
  }, [to, from]);

  const uniqueRoutes = [
    ...new Set(schedules.map((schedule) => schedule.route[0])),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://raw.githubusercontent.com/amith-vp/Kerala-Private-Bus-Timing/main/${dist}.json`
        );
        //
        setSchedules(res.data.busSchedules);
        console.log("fetched data");

        toast.success("success");
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dist, setSchedules]);

  const handleClick = (v) => {
    setVehicle(v);
    navigate("/schedule");
  };

  return (
    <div className="flex w-full  flex-col bg-white h-[90vh]  z-50">
      <div>
        <Toaster />
      </div>

      <p className="text-center text-small lg:text-2xl underline font-bold uppercase">
        Route Details - Timings
      </p>

      <div className="flex  lg:p-3  p-1 h-[100vh] lg:h-5/6 flex-col lg:flex-row">
        <div className="   lg:w-1/2 shadow-lg md:w-full   h-full flex flex-col  overflow-y-auto items-center p-1">
          <div className="flex items-center  flex-col ">
            <img
              src="https://img.freepik.com/premium-vector/logo-bus-icon-vector-silhouette-isolated-design-school-bus-concept-black-icon_653669-3331.jpg?w=740"
              alt=""
              width={250}
              height={250}
            />

            <div className=" text-black flex p-3   flex-col lg:w-[100vh]">
              <div className="flex items-center bg-gray-300  p-2 rounded-full m-3  lg:mx-3 w-full justify-between">
                <LocationOnIcon />
                <p>From</p>
                <select
                  className="p-1  outline-none bg-gray-300 cursor-pointer w-full"
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {/* <option value="">Select Starting point</option> */}
                  {uniqueRoutes.map((route, index) => (
                    <option key={index} className="text-sm ">
                      {route}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center bg-gray-300  p-2 rounded-full m-3  lg:mx-3 w-full justify-between ">
                <NotListedLocationIcon />
                <p>To</p>
                <select
                  className="p-1  outline-none bg-gray-300 cursor-pointer w-full"
                  onChange={(e) => setTo(e.target.value)}
                >
                  {/* <option value="">Select Your Destination</option> */}
                  {uniqueRoutes.map((route, index) => (
                    <option key={index} className="text-sm">
                      {route}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="   lg:w-1/2 shadow-lg md:w-full h-[100vh] lg:h-full m-1 overflow-y-auto p-4">
          <h1 className="sticky top-0 z-10 bg-blue-800 bg-opacity-94  text-white p-3">{`Bus's Travelling through ${from} to ${to}`}</h1>

          <div className="p-3 ">
            {vehicles.map((v) => (
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
      <Marquee direction="left" speed={50} className="text-red-500 fixed  ">
        Added more regions [alappuza
        ,attingal,ernakulam,idukki,kannur,kottayam,kozhikode] .Response Data
        might be inaccurate .Working on it
      </Marquee>
    </div>
  );
}

export default Body;
