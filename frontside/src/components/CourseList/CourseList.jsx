import React from 'react'
import Cards from '../Cards/Card';
import { useEffect, useState } from "react";
import { useUserContext } from '../../context/userContext';
import { useLocation,useNavigate } from "react-router";




export default function CourseList() {
    const {user,setloading}=useUserContext();

    
    const topics=user.topics;
    
    const [posts, setPosts] = useState([]);
    const [mentors,setMentors]=useState([]);
    let flag={};
        const  navigate=useNavigate();
   console.log(topics);
   console.log("up");

   
   
    useEffect(() => {
   
      const fetchPosts = async () => {
        console.log("here");
        if(!user.name)
       { setloading(true);
         navigate("/StudentLogin");
      }
      
    
  
    else
    { 
       for(let i=0;i<topics.length;i++){
       console.log(topics[i]);
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
  
    
   
    console.log(posts);
    return (
        <div>
       <Cards posts={posts}/>
            </div>
    )
}
