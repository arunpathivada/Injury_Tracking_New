import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
const Login = ({history}) => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };
  const userRef= useRef();
  const emailRef= useRef();
  const passwordRef= useRef();
  const [successmessage,setSuccessMessage]= useState(false);
  const [failuremessage,setfailuremessage]=useState(false);
  const [signup,setSignup]=useState(false);
  const [login,setLogin]= useState(true);
  const [showsignup,setshowsignup]= useState(true);
  const changeToSignup= ()=>{
    setSignup(true);
    setLogin(false);
    setshowsignup(false);
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    const user1={
      username:userRef.current.value,
      password:passwordRef.current.value
    }
    try{
      await axios.post("http://localhost:5000/users/login",user1);
      history.push("http://localhost:3000");

 
    }catch(err){
      console.log(err);
    }
  }
  const handleSignup =async(e)=>{
    e.preventDefault();
    const user={
      username:userRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    try{
    await axios.post("http://localhost:5000/users/register",user);
    setLogin(true);
    setSignup(false);
    setSuccessMessage(true);
    setfailuremessage(false);
    }catch(err){
      console.log(err);
      setSuccessMessage(false);
      setfailuremessage(true);
    }
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>


        <div className="right">
          <input type="text" placeholder="Username" ref={userRef}/>
          {signup &&<input type="text" placeholder="email" ref={emailRef}/>}
          <input type="text" placeholder="Password" ref={passwordRef}/>
          {login && <button className="submit" onClick={handleLogin}>Login</button>}
          {signup && <button className="submit" onClick={handleSignup}>SignUp</button>}
          {showsignup &&<span className="signup" onClick={changeToSignup}>SignUp</span>}
          {successmessage &&<span className="success">Suucessfull ,Login now</span>}
          {failuremessage &&<span className="failure">something went wrong</span> }
        </div>
      </div>
    </div>
  );
};

export default Login;