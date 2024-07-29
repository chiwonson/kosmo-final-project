import React from "react";
import {Route, Routes} from "react-router-dom";
import ReservMain from "./routes/ReservMain";
import RservInsert from "./routes/ReservInsert";
import ReservDetail from "./routes/ReservDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReservMain/>}/>
      <Route path="/main" element={<ReservMain/>}/>
      <Route path="/main/:bnum" element={<ReservDetail/>}/>
      <Route path="/insert" element={<RservInsert/>}/>
    </Routes>
  );
}

export default App;
