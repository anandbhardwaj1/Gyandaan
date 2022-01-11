import React,{useEffect,useState} from "react"
import Navbar from "./components/Navbar/navbar";
import StudentSignup from "./components/Student/StudentSignup";
import MentorSignup from "./components/Mentor/MentorSignup";
import StudentLogin from "./components/Student/StudentLogin";
import MentorLogin from "./components/Mentor/MentorLogin";
import {  Routes, Route,useLocation } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CourseList from "./components/CourseList/CourseList";
import StudentProfile from "./components/Student/StudentProfile";
import RazorPay from "./Razorpay/razorpay";
import MentorProfile from "./components/Mentor/MentorProfile";
import {useUserContext} from "./context/userContext"
import Messenger from "./pages/messenger/Messenger";
import {io} from "socket.io-client";
function App() {
  const { loading,socket,setSocket,user } = useUserContext();
  const location = useLocation();
  const [val,setval]=useState("inner");
  const [outer,setOuter]=useState("outer");
  const [data,setData]=useState(null);
 var p=location.pathname.split("/");
const path=p[1]?p[1]:"";

  useEffect(()=>
  { 
   if(location.pathname==="/studentLogin"||location.pathname==="studentSignup")
    { setOuter("outer");
      setval("inner");
      
    }
    else if(location.pathname==="/StudentProfile")
    {
      setOuter("outer");
      setval("inner1");
    }
    else if(location.pathname==="/Courses")
    { setOuter("");
      setval("");
    }
    else
    {
      setOuter("");
      setval("");
    }
   
    

  },[location.pathname]);
 
  useEffect(() => {
    if(user.name)
    setSocket(io("ws://localhost:8900"));
  }, [user.name])

  useEffect(() => {
    if(socket)
    {
      socket.emit("addUser", user._id);
      socket.on("getUsers",(data)=>{
       setData(data);
      });
    }
  }, [socket,user._id])
  if(loading)
 return (<>Please wait...</>)
 
   return(
    <>
    <Navbar pathname={path}/>
    <div className={outer}>
    <div className={val}>
    <Routes>
              <Route exact path='/Home' element={<RazorPay/>} />
                <Route  path='/StudentLogin' element={<StudentLogin/>} />
    
                <Route path="/StudentSignup" element={<StudentSignup/>} />
              
                <Route path="/MentorLogin" element={<MentorLogin/>} />
              
                <Route path ="/MentorSignup" element={<MentorSignup/>}/>
               <Route path="/profile/:id" element={<MentorProfile/>}/>
              <Route path="/Studentprofile" element={<StudentProfile />} />
              <Route path="/Courses" element={<CourseList/>} />
              <Route path="/messenger/:id" element={<Messenger onlineUsers={data}/>}/>
     
     </Routes>
    </div>
    </div>
    
        </>
   )
 



  
}

export default App;
