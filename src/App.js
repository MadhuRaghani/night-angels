import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import Home from "./components/Home";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
