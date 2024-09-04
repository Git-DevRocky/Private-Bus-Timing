import "./App.css";
import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shedule from "./components/Shedule";
import AddRoute from "./components/AddRoute";
function App() {
  return (
    <div className="text-center ">
      <BrowserRouter>
        <Routes path="/">
          <Route path="" element={<Body />} />
          <Route path="/schedule" element={<Shedule />} />
          <Route path="/addroute" element={<AddRoute />} />
        </Routes>
        <p className="text-sm mb-1">
          All Rights Reserved &#169; Albin Sabu 2024
        </p>
      </BrowserRouter>
    </div>
  );
}

export default App;
