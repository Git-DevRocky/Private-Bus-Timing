import "./App.css";
import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shedule from "./components/Shedule";
import AddRoute from "./components/AddRoute";

import Navbar from "./components/Navbar";
import Map from "./components/Map";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Error from "./components/Error";
import Foooter from "./components/Foooter";

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
      <Foooter />
    </div>
  );
}

export default App;
