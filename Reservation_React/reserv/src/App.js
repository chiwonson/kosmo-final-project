import React from "react";
import {Route, Routes} from "react-router-dom";
import reservMain from "./routes/reservMain";
import reservInsert from "./routes/reservInsert";
import reservDetail from "./routes/reservDetail";

function App() {
  return (
    <Routes>
      <Route path="/main" element={<reservMain/>}>
        <Route path="/main/:bnum" element={<reservDetail/>}/>
      </Route>
      <Route path="/insert" element={<reservInsert/>}/>
    </Routes>
  );
}

export default App;
