import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import  "./mentor.css"
import Progress from "./Progress"
function Mentors()
{  const [conversations,setConversations]=useState([]);
    const [mentors,setMentors]=useState([]);
    const {user}=useUserContext();
    useEffect(() => {
        const getConversations = async () => {
           try {
             const res = await axios.get("http://localhost:8800/conversations/" + user._id);
             setConversations(res.data);
           } catch (err) {
             console.log(err);
           }
         };
         getConversations();
       }, []);
    useEffect(() => {

        const getMentors=async(k)=>{
            const mentors=  await axios.get("http://localhost:8800/mentor/"+k);
            return mentors;
        }
       
        for(let i=0;i<conversations.length;i++)
        {
            const k=conversations[i].members.find((m)=>(m!==user._id));
            const k1=getMentors(k);
            k1.then(function(result){
                setMentors((prev)=>[...prev,result.data]);
            });
        }
    }, [conversations])

    
        return (
            <div>
    <section id="scholastic-courses">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h1 style={{color:"purple"}}>Mentors Enrolled</h1>
                        <p style={{color:"blue"}}>Progress Track</p>
                    </div>
                </div>
                <div className="row">
                {mentors.map((p,i) => (
                    <div className="col-lg-4" key={i}>
                    <div className="card-deck">
                        <div className="card border-dark mb-3" style={{width: "20rem"}}>
                            <img className="card-img-top1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHOFpm1jRVEiEv6_-jwYipVlL4JvwS4fZ9_w&usqp=CAU" alt="new"/>
                            <div className="card-body">
                            <h4 className="card-title">{p.name}</h4>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit!</p>
                            <Link to={`/messenger/${p._id}`} className="btn btn-primary">Message</Link>
                            <a style={{color:"black" ,background:"orange"}} href={`/Profile/${p._id}`} className="btn btn-outline">Details</a>
                            </div>
                            <div>
                            <p style={{color:"black", marginLeft:"10px"}}>Progress </p>
                            <Progress done={i===0?"20":"60"}/></div>
                        </div>
                        </div>
                       </div>
                                        
          ))}
                   
                   </div>
                </div>
        </section>
                
            </div>
        )
    

}
export default Mentors;