import React from 'react'
import "./navbar.css"
import "./aos.css"

export default function navbar() {
    return (
        


        <nav className="navbar smart-scroll navbar-custom  navbar-expand-md navbar-light"> 
        
  
            <div className="collapse  navbar-collapse" id="navbarToggleExternalContent">
                <ul className="navbar-nav  ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/studentLogin">Student Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/StudentSignup">Student Signup</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/MentorLogin">Mentor Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/MentorSignup">Mentor Signup</a>
                    </li>
                </ul>
            </div>
        </nav> 
  
            
     
    )
}
