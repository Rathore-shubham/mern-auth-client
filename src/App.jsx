import { BrowserRouter, Routes, Route} from "react-router-dom";
// import { useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      

      <Routes>
        {/* <Route path="/" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={ <Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
