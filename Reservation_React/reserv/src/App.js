import React from "react";
import {Route, Routes} from "react-router-dom";
import ReservMain from "./routes/reservMain";
import RservInsert from "./routes/reservInsert";
import ReservDetail from "./routes/reservDetail";

function App() {
  return (
    <Routes>
      <Route path="/main" element={<ReservMain/>}>
        <Route path=":bnum" element={<RservInsert/>}/>
      </Route>
      <Route path="/insert" element={<ReservDetail/>}/>
    </Routes>
  );
}

export default App;
