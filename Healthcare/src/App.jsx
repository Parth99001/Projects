import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Myappoitment from "./pages/Myappoitment";
import Login from "./pages/Login";
import Myprofile from "./pages/Myprofile";
// import Appoitment from "./pages/Appoitment";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Doctors" element={<Doctors />}></Route>
        <Route path="/Doctors/:speciality" element={<Doctors />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Myprofile" element={<Myprofile />}></Route>
        <Route path="/Myappointment" element={<Myappoitment />}></Route>
        <Route path="/Appointment/:docId" element={<Appointment/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
