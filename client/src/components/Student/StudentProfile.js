import React,{useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import { useUserContext } from '../../context/userContext';
import {Button} from "react-bootstrap"
import "./Student.css"

 function StudentProfile() {

     
     const [flag,setFlag]=useState(0);
     const navigate=useNavigate();
     const user1={username:"Anand",email:"abc@",firstname:"Abc",surname:"xyz",topics:["C++","HTML","c","d","e","f"]}
     const { user,loading,logOut,setloading } = useUserContext();
    

    const  data=[
    {value:1,label:"C++"},
    {value:2,label:"java"},
    {value:3,label:"ReactJs"},
    {value:4,label:"Python"},
    {value:5,label:"Html"},
    {value:6,label:"C++2"},
    {value:7,label:"java2"},
    {value:8,label:"ReactJs2"},
    {value:9,label:"Python2"}
 ]
 const [items,getvalue]=useState();
 const handleSelect =(e) =>{
    getvalue(Array.isArray(e)?e.map(x=>x.label):[]);
}

const  handleSubmit=()=>
   {  if(flag)
      setFlag(0);
      else
      setFlag(1);
   }
 var defaultTopics=[];
 
 if(!items)
 for(let i=0;i<user1.topics.length;i++)
 {  let value=i+1;
    let label=user1.topics[i];
     defaultTopics.push({value,label});   
 }
 else
 for(let i=0;i<items.length;i++)
 {  let value=i+1;
    let label=items[i];
     defaultTopics.push({value,label});   
 }
  useEffect(()=>
  {// console.log(user.name);
     if(!loading&&!user.name)
    { setloading(true);
        navigate("/studentLogin");
     
  }
   
  
  },[user])
  
 
 
    return (
            <div className="container">
        <div className="main">
            
            <div className="row">
                <div className="col-md-4 mt-1">
                    <div className="card text-center sidebar">
                        <div className="card-body">
                            <img src="https://media.istockphoto.com/vectors/user-avatar-icon-sign-symbol-vector-id538748141?k=20&m=538748141&s=612x612&w=0&h=INss7HfK8ygPGlqelxxyqQjVUCJz16RehSYHYTCDX1g=" className="rounded-circle" width="150" />
                            <div className="mt-3">
                                <h3>{user.name}</h3>
                                    <a style={{color:"black"}} href="/Home">Home</a>
                                    <div>
                                   <a href="/CourseMentors">Meet Our Mentors</a>
                                   </div>
                                   <div>
                                   <a style={{color:"green"}} href="/video/temp">Video Chat</a>
                                   </div>
                                   <div>
                                   <Button variant="secondary" onClick={logOut}>Sign out</Button>
                                   </div>
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mt-1">
                    <div className="card mb-3 content">
                        <h2 className="m-3 pt-3">Student Details</h2>
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
                        <h2 className="m-3">Interested Topics</h2>
                        <div className="card-body">
                            <div className="row">
                    
                                {!items?user1.topics.map((p,i) => (
                                        <div className="col-md-4" key={i}>
                                        <h5>{p}</h5>
                                    </div>
                                 )):
                                 items.map((p,i) => (
                                        <div className="col-md-4" key={i}>
                                        <h5>{p}</h5>
                                    </div>
                                 )) }
                           {!flag&&   <button type="submit"  className="custom-btn" onClick={handleSubmit}>Edit Topics</button>
                                    }
                            </div>
                        </div>
                    </div>
                    


                  {flag?  <div className="card mb-3 content">   
                        <h2 className="m-3">Add or remove Topics</h2>
                        <div className="card-body">
                            <div className="row">
                    
                             <div className="form-group">

                                <label style={{color:'red'}}>Select Topics</label>
                                <Select isMulti options={data} defaultValue={ defaultTopics} onChange={handleSelect}/>
                                 </div>
                                 <button type="submit"  className="custom-btn2" onClick={handleSubmit}>Submit Topics</button>
               
                            </div>
                        </div>
                    </div>:null}
                </div>
            </div>
        </div>
    </div>
    
    
    )
}
export default StudentProfile;