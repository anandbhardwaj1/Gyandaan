import React from 'react'
import Cards from '../Cards/Card';
import { useEffect, useState } from "react";
import { useUserContext } from '../../context/userContext';
import { useLocation,useNavigate } from "react-router";




export default function CourseList() {
    const {user,setloading}=useUserContext();
    const [posts, setPosts] = useState([]);
    const  navigate=useNavigate();
  
    useEffect(() => {
      
      const fetchPosts = async () => {

        if(!user.name)
       { setloading(true);
         navigate("/StudentLogin");
      }
      else
      {
        fetch('http://localhost:8800/courses')
        .then(response => response.json())
        .then((data) =>{ 
         
          setPosts(data)
         
        });
      }
       
      };
      fetchPosts();
    }, [user.name]);
    
    return (
        <div>
       <Cards posts={posts}/>
            </div>
    )
}
