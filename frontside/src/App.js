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
import {useUserContext} from "./context/userContext"

function App() {
  const { loading } = useUserContext();
  const location = useLocation();
  const [val,setval]=useState("inner");
  const [outer,setOuter]=useState("outer");
 
  useEffect(()=>
  {
    if(location.pathname==="/StudentProfile")
    { setOuter("outer");
      setval("inner1");
      
    }
    else if(location.pathname==="/Courses")
    { setOuter("");
      setval("");
    }
    else
    {
      setOuter("outer");
      setval("inner");
    }
   
    

  },[location.pathname]);

  if(loading)
 return (<>Please wait...</>)
 
   return(
    <>
    <Navbar/>
    <div className={outer}>
    <div className={val}>
    <Routes>
              <Route exact path='/' element={<StudentLogin/>} />
                <Route  path='/StudentLogin' element={<StudentLogin/>} />
    
                <Route path="/StudentSignup" element={<StudentSignup/>} />
              
                <Route path="/MentorLogin" element={<MentorLogin/>} />
              
                <Route path ="/MentorSignup" element={<MentorSignup/>}/>
             
              <Route path="/Studentprofile" element={<StudentProfile />} />
              <Route path="/Courses" element={<CourseList/>} />
     
     </Routes>
    </div>
    </div>
    
        </>
   )
 



  
}

export default App;
