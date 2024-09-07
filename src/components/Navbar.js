import React, { useState } from "react";

import { useRoute } from "../contexts/RouteContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Hamburger from "hamburger-react";
import { useSelector } from "react-redux";

function Navbar() {
  const { setDist } = useRoute();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const to = useSelector((state) => state.location.to);
  const from = useSelector((state) => state.location.from);
  const handleMap = () => {
    to === "" && from === ""
      ? alert("you have to select route")
      : navigate("/map");
  };
  return (
    <div className="bg-black z-200 top-0  sticky relative text-white h-15   p-2 flex items-center justify-between flex-col lg:flex-row">
      <div className="flex items-center  ">
        <button onClick={() => navigate("/")} className="flex items-center">
          <img
            src="https://i.pinimg.com/736x/3e/17/bd/3e17bdebf827bb5c34cb7900c901acec.jpg"
            alt="logo"
            className="h-10 w-10 "
          />
          <h1 className="mx-3 font-bold lg:text-2xl">Bus-Timings</h1>
        </button>
      </div>

      <div className="flex items-center bg-gray-300 lg:p-2 p-2  lg:m-3  lg:mx-3 rounded-full  text-black uppercase">
        <h1 className="font-semibold lg:px-2">Select Region</h1>
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
          <option value="kozhikkode"> Kozhikkode</option>
          <option value="malappuram"> Malappuram</option>
          <option value="muvattupuzha"> Muvattupuzha</option>
          <option value="palakkad-1"> Palakkad-1</option>
          <option value="palakkad-2"> Palakkad-2</option>
          <option value="pathanamthitta"> Pathanamthittaa</option>
          <option value="vadakara"> Vadakara</option>
          <option value="wayanad"> Wayanad</option>
        </select>
      </div>
      <div className="flex items-center   ">
        {isOpen && (
          <div className="flex flex-col absolute  top-10 right-20 p-2 h-60 w-40 z-400  bg-violet-800 text-white rounded cursor-pointer justify-center items-center">
            <ul>
              <button onClick={() => navigate("/")} className="w-full">
                <li className="p-1 hover:bg-gray-200 hover:text-black hover:rounded ">
                  Home
                </li>
              </button>

              <button onClick={() => handleMap()} className="w-full">
                <li className="p-1 hover:bg-gray-200 hover:text-black hover:rounded">
                  View in Map
                </li>
              </button>

              <button onClick={() => navigate("/addroute")} className="w-full">
                <li className="p-1 hover:bg-gray-200 hover:text-black hover:rounded">
                  Add Route
                </li>
              </button>

              <a
                href="https://github.com/albinsabu2023/Kerala-Private-Bus-Timing-App"
                className="w-full"
              >
                <li className="p-1 hover:bg-gray-200 hover:text-black hover:rounded">
                  Github Repo
                </li>
              </a>

              <li className="p-1 hover:bg-gray-200 hover:text-black hover:rounded w-full">
                Live Track
              </li>
            </ul>
          </div>
        )}

        <Hamburger toggled={isOpen} toggle={setOpen} />
        <button
          className=" text-white lg:px-6   rounded-md font-semibold   "
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
