import Navbar from "./components/Navbar";
import "./app.css";
import Home from "./pages/Home";
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientTable from "./components/PatientTable.jsx";
import axios from "axios";
<imp></imp>
const App = () => {
  const [user, setUser] = useState(null);
  const [patients,setPatients]=useState([]);
  useEffect(()=>{
    const getPatients= async ()=>{
       try{
        const res = await axios.get("https://injury-tracking2.onrender.com/patients");
        setPatients(res.data);
       }catch(err){
        console.log(err);
       }
    }
    getPatients();
  },[]);

  useEffect(() => {
    const getUser = () => {
      fetch("https://injury-tracking2.onrender.com/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
      <div className="app">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
          <Route path="/patient-table" element={<PatientTable patients={patients} />} /> 
        </Routes>
      </div>
  );
};

export default App;
