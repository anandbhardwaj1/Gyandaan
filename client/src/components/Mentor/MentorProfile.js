import React,{useEffect, useState} from 'react'
import {useNavigate,useParams,Link} from "react-router-dom";
import { useUserContext } from '../../context/userContext';
import {Button} from "react-bootstrap"
import axios from "axios";
import "./Student.css"

 function MentorProfile() {
     const navigate=useNavigate();
     const [mentor, setMentor] = useState({});
     const { id } = useParams();
   
  const user1={username:"Anand",email:"abc@",firstname:"Abc",surname:"xyz",topics:["C++","HTML","c","d","e","f"]}
   const {user,loading,setloading}=useUserContext();

  const postId=async()=>
  {
      const res=await axios.post("http://localhost:8800/conversation",{senderId:user._id,receiverId:id});
      console.log(res);
      navigate(`/messenger/${id}`);
  }
  const videoCall=async()=>
  {
     
      navigate(`/video/${id}`);
  }
  useEffect(()=>
  {
      if(!loading&&!user.name)
    { setloading(true);
        navigate("/StudentLogin")
    }
     const getMentor =async()=>{
        
      fetch("http://localhost:8800/mentor/"+id).then(response => response.json())
      .then((data) =>{ 
        setMentor(data);
      })
    
     
    }
    getMentor();
  
  },[user,id])
  
 
    return (
            <div className="container">
        <div className="main">
            
            <div className="row">
                <div className="col-md-4 mt-1">
                    <div className="card text-center sidebar">
                        <div className="card-body">
                            <img src="https://media.istockphoto.com/vectors/user-avatar-icon-sign-symbol-vector-id538748141?k=20&m=538748141&s=612x612&w=0&h=INss7HfK8ygPGlqelxxyqQjVUCJz16RehSYHYTCDX1g=" className="rounded-circle" width="150" />
                            <div className="mt-3">
                                <h3>{mentor.name}</h3>
                                    <a href="/">Home</a>
                                    <div>
                                   <a href="/Courses">Courses</a>
                                   </div>
                                   <div>
                                   
                                   <button type="button" class="btn btn-info" onClick={postId}>Start a Chat</button>
                                   
                                   </div>
                                   <div>
                                   
                                   <button type="button" style={{color:"darkgreen"}}  class="custom-button2" onClick={videoCall}>Start a VideoCall</button>
                                   
                                   </div>
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mt-1">
                    <div className="card mb-3 content">
                        <h2 className="m-3 pt-3">Mentor Details</h2>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <h5>Username</h5>
                                </div>
                                <div className="col-md-9 text-secondary">
                                {user.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <h5>Email</h5>
                                </div>
                                <div className="col-md-9 text-secondary">
                                {user.email}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <h5>firstname</h5>
                                </div>
                                <div className="col-md-9 text-secondary">
                                    {user1.firstname}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <h5>Last Name</h5>
                                </div>
                                <div className="col-md-9 text-secondary">
                                    {user1.surname}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <h5>Phone</h5>
                                </div>
                                <div className="col-md-9 text-secondary">
                                    {user.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 content">
                        <h2 className="m-3">Mentor Topics</h2>
                        <div className="card-body">
                            <div className="row">
                    
                                {user1.topics.map((p,i) => (
                                        <div className="col-md-4" key={i}>
                                        <h5>{p}</h5>
                                    </div>
                                 ))}
                                 
               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    )
}
export default MentorProfile;