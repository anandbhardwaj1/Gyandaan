import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.css"
import "./aos.css"
import Notification from  "../../assets/notification.svg"
import { useUserContext } from '../../context/userContext'
 function Navbar({pathname}) {
   const navigate=useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const {user,socket,logOut}=useUserContext();
  //  console.log(pathname);
    const displayNotification = ({ senderName, type }) => {
      let action="sent a new message";
      return (
        <span className="notification">{`${senderName} ${action}.`}</span>
      );
    };
 
    const handleRead = () => {
      setNotifications([]);
      setOpen(false);
      navigate("/messenger/123")
    };
  
    useEffect(() => {
    
        socket?.on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data]);
          });
    }, [socket])
 
    
    return (
        

        <nav className="navbar smart-scroll navbar-custom  navbar-expand-md navbar-light"> 
        
  
            <div className="collapse  navbar-collapse" id="navbarToggleExternalContent">
            {user.name&&
                <ul className="navbar-nav  ml-auto"> 
                    <li className="nav-item">
                        <a className="nav-link" href="/Home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/StudentProfile">Profile</a>
                    </li>
                   
                    <li className="nav-item">
                        <a className="logout" href="/studentLogin" onClick={logOut}>Sign out</a>
                    </li>
                   
                </ul>
            }
             {!user.name?
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
              :null}

            </div>
            {(user.name&&(pathname!=="messenger"))?
            <div className="navbar">
      <span className="logo">Notifications</span>
      <div className="icons">
        <div className="icon" onClick={() => notifications.length>0&&setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {

            <div className="counter">{notifications.length>0?notifications.length:null}</div>
          }
        </div>
       
      
      </div>
    </div>
            :null}


            {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Check all messages
          </button>
        </div>
      )}
        </nav> 
  
               
     
    )
}
export default Navbar;
