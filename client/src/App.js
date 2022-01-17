import React,{useEffect,useState,useRef} from "react"
import Navbar from "./components/Navbar/navbar";
import StudentSignup from "./components/Student/StudentSignup";
import MentorSignup from "./components/Mentor/MentorSignup";
import StudentLogin from "./components/Student/StudentLogin";
import MentorLogin from "./components/Mentor/MentorLogin";
import {  Routes, Route,useLocation, Navigate } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CourseList from "./components/CourseList/CourseList";
import StudentProfile from "./components/Student/StudentProfile";
import HomePage from "./components/Home/Home"
import MentorProfile from "./components/Mentor/MentorProfile";
import {useUserContext} from "./context/userContext"
import Messenger from "./pages/messenger/Messenger";
import VideoApp from "./components/VideoChat/videoApp";
import {io} from "socket.io-client";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  const { loading,socket,setSocket,user } = useUserContext();
  const location = useLocation();
  const [val,setval]=useState("inner");
  const [outer,setOuter]=useState("outer");
  const [data,setData]=useState(null);
  var p=location.pathname.split("/");
const path=p[1]?p[1]:"";
var active=useRef();
  useEffect(()=>
  {  if(location.pathname==="/studentLogin")
    {  active.current=1;
       setOuter("outer");setval("inner");
    } else  if(location.pathname==="/StudentSignup")
    {  active.current=2;
       setOuter("outer");setval("inner");
    }else  if(location.pathname==="/MentorSignup")
    {  active.current=4;
       setOuter("outer");setval("inner"); 
    }else  if(location.pathname==="/MentorLogin")
    {  active.current=3;
       setOuter("outer");setval("inner");
    }else
    {setOuter(""); setval("");
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
    <Navbar pathname={path} active={active}/>
    <div className={outer}>
    <div className={val}>
    <Routes>
              <Route  path='/' element={<StudentProfile/>} /> 
              <Route  path='/Home' element={<HomePage/>} />
                <Route  path='/StudentLogin' element={<StudentLogin/>} />
    
                <Route path="/StudentSignup" element={<StudentSignup/>} />
              
                <Route path="/MentorLogin" element={<MentorLogin/>} />
              
                <Route path ="/MentorSignup" element={<MentorSignup/>}/>
               <Route path="/profile/:id" element={<MentorProfile/>}/>
              <Route path="/Studentprofile" element={<StudentProfile />} />
              <Route path="/CourseMentors" element={<CourseList/>} />
              <Route path="/messenger/:id" element={<Messenger onlineUsers={data}/>}/>
            {user.name&&  <Route path="/video/:id" element={<VideoApp onlineUsers={data}/>} />}
            
     </Routes>
    </div>
    </div>
    <ToastContainer/>
    
        </>
   )
 



  
}

export default App;
