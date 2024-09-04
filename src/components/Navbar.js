import React, { useEffect } from "react";
import jsonData from "../data/data.json";
import { useRoute } from "../contexts/RouteContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Navbar() {
  const { from, setFrom, to, setTo } = useRoute();
  const schedules = jsonData.busSchedules;

  const uniqueRoutes = [
    ...new Set(schedules.map((schedule) => schedule.route[0])),
  ];
  useEffect(() => {
    console.log(to);
  }, [from, to]);
  return (
    <div className="bg-black z-100 sticky top-0 text-white h-15   p-5 flex items-center justify-between">
      <div className="flex items-center ">
        <a href="/" className="flex items-center">
          <img
            src="https://i.pinimg.com/736x/3e/17/bd/3e17bdebf827bb5c34cb7900c901acec.jpg"
            alt="logo"
            className="h-10 w-10 "
          />
          <h1 className="mx-3 font-bold text-2xl">Bus-Timings</h1>
        </a>
      </div>
      <div className=" text-black flex p-2  ">
        <div className="flex items-center bg-gray-300 p-2 mx-3  rounded-tl-full rounded-bl-full ">
          <h1 className=" font-semibold px-2">From:</h1>
          <select
            className="p-1  outline-none bg-gray-300 cursor-pointer"
            onChange={(e) => setFrom(e.target.value)}
          >
            {uniqueRoutes.map((route, index) => (
              <option key={index}>{route}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center bg-gray-300  p-2 rounded-tr-full rounded-br-full ">
          <h1 className=" font-semibold ">To:</h1>
          <select
            className="p-1  outline-none bg-gray-300 cursor-pointer"
            onChange={(e) => setTo(e.target.value)}
          >
            {uniqueRoutes.map((route, index) => (
              <option key={index}>{route}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex hidden lg:flex ">
        <button className="bg-blue-800 px-6 py-2 rounded-md font-semibold hover:bg-blue-700 m-2">
          <a href="/addroute">Add Route</a>
        </button>
        <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 m-2">
          <a href="/">
            <ArrowBackIcon />
          </a>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
