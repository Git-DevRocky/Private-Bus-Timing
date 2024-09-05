import React from "react";

import { useRoute } from "../contexts/RouteContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Navbar() {
  const { setDist } = useRoute();

  return (
    <div className="bg-black z-500   sticky top-0 text-white h-15   p-5 flex items-center justify-between flex-col lg:flex-row">
      <div className="flex items-center  ">
        <a href="/" className="flex items-center">
          <img
            src="https://i.pinimg.com/736x/3e/17/bd/3e17bdebf827bb5c34cb7900c901acec.jpg"
            alt="logo"
            className="h-10 w-10 "
          />
          <h1 className="mx-3 font-bold text-2xl">Bus-Timings</h1>
        </a>
      </div>

      <div className="flex items-center bg-gray-300 p-2 m-3  lg:mx-3 rounded-full  text-black uppercase">
        <h1 className="font-semibold px-2">Select Region</h1>
        <select
          className="p-1  outline-none bg-gray-300 cursor-pointer"
          onChange={(e) => setDist(e.target.value)}
        >
          <option value="alappuzha"> Alappuzha</option>
          <option value="attingal"> Attingal</option>
          <option value="ernakulam"> Ernakulam</option>
          <option value="idukki"> Idukki</option>
          <option value="kannur"> Kannur</option>
          <option value="kottayam"> Kottayam</option>
          <option value="kozhikkode"> Koazhikkode</option>
          <option value="malappuram"> Malappuram</option>
          <option value="muvattupuzha"> Muvattupuzha</option>
          <option value="palakkad-1"> Palakkad-1</option>
          <option value="palakkad-2"> Palakkad-2</option>
          <option value="pathanamthitta"> Pathanamthittaa</option>
          <option value="vadakara"> Vadakara</option>
          <option value="wayanad"> Wayanad</option>
        </select>
      </div>
      <div className="flex hidden lg:flex ">
        <a href="/addroute">
          <button className="bg-blue-800 px-6 py-2 rounded-md font-semibold hover:bg-blue-700 m-2">
            Add Route
          </button>
        </a>
        <a href="/">
          <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 m-2">
            <ArrowBackIcon />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
