import axios from "axios";
import { useEffect, useState,useRef } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState("")
  const inputRef = useRef();
 
 
   
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try { 
        const res = await axios("http://localhost:8800/students/" + friendId);
        setUser(res.data);
      } catch (err) {
        setUser("mentor1");
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
 
  return (
    <div className="conversation" >
      <img
        className="conversationImg"
        src={
         " https://media.istockphoto.com/vectors/user-avatar-icon-sign-symbol-vector-id538748141?k=20&m=538748141&s=612x612&w=0&h=INss7HfK8ygPGlqelxxyqQjVUCJz16RehSYHYTCDX1g="
        }
        alt=""
      />
      <span   className="conversationName" >{user}</span>
    </div>
  );
}
