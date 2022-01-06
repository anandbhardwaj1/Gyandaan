import "./messenger.css";
import Message from "../../components/message/Message";
import { useEffect, useRef, useState} from "react";
import { useParams } from "react-router";
import { useUserContext } from '../../context/userContext';
import axios from "axios";
import { io } from "socket.io-client";
import Conversation from "../../components/conversations/Conversation"


export default function Messenger() {

  const [conversations,setConversations]=useState([])
  const {user}=useUserContext();
  const { id } = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receiver,setReceiver]=useState("");
  const [flag,setFlag]=useState(false);
  const socket = useRef();

  const scrollRef = useRef();
  
  const inputRef = useRef();
 
 


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
   
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: (data.text),
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers",(data)=>{
      const k=data.find((user) => user.userId === id);
      if(!k)
      setFlag(false);
      else
      setFlag(true);
    })
  }, [user]);

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
  }, [user._id]);
 
  useEffect(() => {
    const getCurrentChat = async () => {
      try { 
        const res = await axios.get(

          `http://localhost:8800/conversations/find/${id}/${user._id}`
        );
        setCurrentChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentChat();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: (newMessage),
      conversationId: currentChat._id,
    };
    if(flag)
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: id,
      text: (newMessage),
    });
    try {
      const res = await axios.post("http://localhost:8800/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(()=>{
    const friendId =currentChat?.members.find((m) => m !== user._id);
    if(friendId)
    {  const getUser = async () => {
      try { 
        const res = await axios("http://localhost:8800/students/" + friendId);
        setReceiver(res.data);
      } catch (err) {
        setReceiver("mentor1");
        console.log(err);
      }
    };
    getUser();
     
    }

  },[currentChat])
  
 
if(messages.length!==0)
  return (
    <>
    <div  className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper" >
        <input placeholder="Search for contacts" className="chatMenuInput" />
        {conversations.map((c) => (
          <div onClick={() => setCurrentChat(c)} >
            <Conversation conversation={c} currentUser={user} />
          </div>
        ))}
      </div>
    </div>
   
    <div className="chatBox">
   
      <div className="chatBoxWrapper">
        {currentChat ? (
          <>
            <div className="chatBoxTop">
            <div className="receiverName">{receiver}</div>
              {
                messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender === user._id} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="noConversationText ">
          <>
          Open a conversation to start a chat.
          </>
          
          </span>
        )}
      </div>
    </div>
    
  </div>
</>

  );
  else
  {
    return (
      <>
      <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
               
              <span className="noConversationText">
             Start a conversation with mentor1.
            </span>
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
      
    </div>
  </>
  
    );
  }
}
