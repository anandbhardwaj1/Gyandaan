
import Navbar from "./components/Navbar/navbar";
import StudentSignup from "./components/Student/StudentSignup";
import MentorSignup from "./components/Mentor/MentorSignup";
import StudentLogin from "./components/Student/StudentLogin";
import MentorLogin from "./components/Mentor/MentorLogin";
import {  Routes, Route, NavLink as ReactLink } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Student/StudentLogin";
function App() {
  return (
    <>
<Navbar/>
<div className="outer">
<div className="inner">
<Routes>
            <Route exact path='/' element={<StudentLogin/>} />
            <Route exact path='/StudentLogin' element={<StudentLogin/>} />

            <Route path="/StudentSignup" element={<StudentSignup/>} />
          
            <Route path="/MentorLogin" element={<MentorLogin/>} />
          
            <Route path ="/MentorSignup" element={<MentorSignup/>}/>
            
          </Routes>
</div>
</div>

    </>
  );
}

export default App;
