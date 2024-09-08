import "./App.css";
import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shedule from "./components/Shedule";
import AddRoute from "./components/AddRoute";
import Marquee from "react-fast-marquee";
import Navbar from "./components/Navbar";
import Map from "./components/Map";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Error from "./components/Error";

function App() {
  return (
    <div className="text-center ">
      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
          <Routes path="/">
            <Route path="" element={<Body />} />
            <Route path="/schedule" element={<Shedule />} />
            <Route path="/addroute" element={<AddRoute />} />
            <Route path="/map" element={<Map />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </Provider>
      </BrowserRouter>
      <Marquee
        direction="left"
        speed={50}
        className="text-red-900  text-small  absolute bottom-0 mt-5 "
      >
        Added more regions [alappuza
        ,attingal,ernakulam,idukki,kannur,kottayam,kozhikode] .Response Data
        might be inaccurate .Working on it
      </Marquee>
      <p className="text-sm mb-1">All Rights Reserved &#169; Albin Sabu 2024</p>
    </div>
  );
}

export default App;
