import React, { useState } from "react";
import {Route, Routes} from "react-router-dom";
import ReservMain from "./routes/ReservMain";
import RservInsert from "./routes/ReservInsert";
import ReservDetail from "./routes/ReservDetail";
import BakeryInsert from "./routes/BakeryInsert";
import HHeader from "./layout/HHeader";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <HHeader isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<ReservMain/>}/>
        <Route path="/main" element={<ReservMain/>}/>
        <Route path="/main/:bnum" element={<ReservDetail/>}/>
        <Route path="/insert" element={<RservInsert/>}/>
        <Route path="/bakeryinsert" element={<BakeryInsert/>}/>
      </Routes>
    </>
  );
}

export default App;
