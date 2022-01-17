import React from 'react'
import Cards from '../Cards/Card';
import { useEffect, useState } from "react";
import { useUserContext } from '../../context/userContext';
import { useNavigate } from "react-router";
import {toast} from "react-toastify";
export default function CourseList() {
    const {user,setloading}=useUserContext();

    const topics=user.topics;
    
    const [posts, setPosts] = useState([]);
    const [mentors,setMentors]=useState([]);
    let flag={};
        const  navigate=useNavigate();
   
    useEffect(() => {
   
      const fetchPosts = async () => {
        
        if(!user.name)
       { setloading(true);
         navigate("/StudentLogin");
      }
      
     
    else
    { 
       for(let i=0;i<topics.length;i++){
      fetch('http://localhost:8800/mentors',{
        method: 'POST',
        body: JSON.stringify({topic:topics[i]}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) =>{ 
       for(let j=0;j<data.length;j++)
        {
          if(!flag[data[j]._id])
          {   flag[data[j]._id]=true;
            setPosts((prev)=>[...prev,data[j]]);
         
          }
        }
      })
    }
  }
}
     
      fetchPosts();
    

    }, []);
    useEffect(()=>{
      toast.dark("These Mentors are related to your current requirement",{closeOnClick: true,
        pauseOnHover: true,});
    },[])
  
    return (
        <div>
       <Cards posts={posts}/>
            </div>
    )
}
