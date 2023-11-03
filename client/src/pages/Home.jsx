import React, { useState ,useEffect} from 'react';
import "./home.css"
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import "../components/popup.css"
import { Link } from 'react-router-dom';
const Home = () => {
  const [markerPosition, setMarkerPosition] = useState([0,0]);
  const [patients,setPatients]=useState([]);
  const [patientName,setPatientName]=useState(null);
  const [age,setAge]=useState(null);
  const [gender,setGender]=useState(null);
  const [injurySpot,setInjurySpot]=useState(null);
  const [reasonDesc,setReason]=useState(null);
  const [dateOfJoin,setJoinDate]=useState(null);
  const [success,setSuccess]= useState(false);
  const [failure,setFailure]=useState(false);
  const [showPopup,setshowPopup]= useState(false);
const handleSubmit=async (e)=>{
    e.preventDefault();
    setFailure(false);
    setSuccess(false);
    const newPatient={
      patientName:patientName,
      gender:gender,
      age:age,
      injurySpot:injurySpot,
      reasonDesc:reasonDesc,
      dateOfJoin:dateOfJoin,
      x:markerPosition.x,
      y:markerPosition.y
    }
    try{
      const res = await axios.post("https://injury-tracking2.onrender.com/patients", newPatient);
      setPatients([...patients,res.data]);
      setSuccess(true);
    }catch(err){
      console.log(err);
      setFailure(true);
    }
  }
    useEffect(()=>{
        const getPatients= async ()=>{
           try{
            const res = await axios.get("https://injury-tracking2.onrender.com/patients");
            console.log(res);
            setPatients(res.data);
            console.log(res.data);
           }catch(err){
            console.log(err);
           }
        }
        getPatients();
      },[]);



    const handleDoubleClick = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        console.log(x,y);
        setFailure(false);
        setSuccess(false);
        setMarkerPosition({ x, y});
        setshowPopup(true);
    }

    const handleCancelClick=()=>{
      setshowPopup(false);
    }

    return (
        <div className="home">
            <div className="title">
                <h2>Add Injuries Here</h2>
            </div>
            <div className="image">
                <img src = "https://media.istockphoto.com/id/689294564/vector/vector-silhouettes-of-man-front-and-back-view.jpg?s=612x612&w=0&k=20&c=D9-vc7pS-ubDHtlbb5l-EbtE_8kgqK7E0H-B3GrYKsk=" alt="body image" onDoubleClick={handleDoubleClick} />
                <div style={{ position: 'absolute', left: markerPosition.x, top: markerPosition.y}}>
                <img src={require("../img/reddot.png")} alt="Marker Image"/>
                 </div>
            </div>


            {patients.map((patient)=>(
                (<div style={{ position: 'absolute', left: patient.x, top: patient.y }}>
                <img src={require("../img/reddot.png")} alt="Marker Image"/>
            </div>
                 )))}
            <button className="button hover-effect">
                     <Link to="/patient-table" style={{ textDecoration: 'none', color: 'inherit' }}>See List of Injuries</Link>
              </button>

            {markerPosition && (
              (showPopup && 
                <div className='Patientform' style={{ position: 'absolute', right:markerPosition.x,top:markerPosition.y}}>
                <form onSubmit={handleSubmit} >
                  <div className='cancel' onClick={handleCancelClick}> <CancelIcon /></div>
                    <label>Patient Name</label>
                    <input placeholder='Enter a patient Name' onChange={(e)=>{setPatientName(e.target.value)}}/>
                    <label>Gender</label>
                    <input type="text"  placeholder= 'Gender - M/F' onChange={(e)=>{setGender(e.target.value)}} />
                    <label>Age</label>
                    <input type="Number"  placeholder= 'Enter Age' onChange={(e)=>{setAge(e.target.value)}} />
                    <label>Injury Spot</label>
                    <input type="text"  placeholder= 'body part name' onChange={(e)=>{setInjurySpot(e.target.value)}} />
                    <label>Reason</label>
                    <input type="text" placeholder='Reason for injury' onChange={(e)=>{setReason(e.target.value)}}/>
                    <label>Date of Joining</label>
                    <input type="text"  placeholder= 'Date-DD/MM/YYYY' onChange={(e)=>{setJoinDate(e.target.value)}} />
                    <button className='submitButton' type="submit">Add Injury</button>
                    {success &&<span className='success'>Pateint details added</span>}
                    {failure && <span className='failure'>something went wrong</span>}
                  </form>
                  </div>
              )
            )}
        </div>
    )
}

export default Home
