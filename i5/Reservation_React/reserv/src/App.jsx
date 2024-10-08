import React from "react";
import {Route, Routes} from "react-router-dom";
import ReservMain from "./routes/ReservMain";
import RservInsert from "./routes/ReservInsert";
import ReservDetail from "./routes/ReservDetail";
import BakeryInsert from "./routes/BakeryInsert";
function App() {
  return (
    <>
      <Routes>
        <Route path="/reservation" element={<ReservMain/>}/>
        <Route path="/reservation/:bnum" element={<ReservDetail/>}/>
        <Route path="/insert" element={<RservInsert/>}/>
        <Route path="/bakeryinsert" element={<BakeryInsert/>}/>
      </Routes>
    </>
  );
}

export default App;

/*<Route path="/main" element={<ReservMain/>}/>*/
