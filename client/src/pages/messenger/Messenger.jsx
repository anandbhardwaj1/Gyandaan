import "./messenger.css";
import Message from "../../components/message/Message";
import { useEffect, useRef, useState} from "react";
import { useParams } from "react-router";
import { useUserContext } from '../../context/userContext';
import axios from "axios";

import Conversation from "../../components/conversations/Conversation"

export default function Messenger({onlineUsers}) {
  const [conversations,setConversations]=useState([]) //to store all conversations of user
  const {user,socket}=useUserContext();    
  const { id } = useParams();
  const [currentChat, setCurrentChat] = useState(null); //storing  conversation details of current friend/mentor
  const [messages, setMessages] = useState([]);  
  const [newMessage, setNewMessage] = useState("");//current message 
  const [arrivalMessage, setArrivalMessage] = useState(null);//realtime message  sent by socket io 
  const [receiver,setReceiver]=useState("");   //initial receiver
  const [flag,setFlag]=useState(false);  //check receiver is online or not
  const [receiver2,setReceiver2]=useState(""); // current receiver 
  const [search,setSearch]=useState("");  //keyword to search for particular user
  const [filterData,setfilterData]=useState([]);//filtered  user on the basis of keyword
  const [mapFriend,setMapFriend]=useState([]);  //all messaging contacts of current user 

  const [f_id,setF_id]=useState("");  //friend id 
  const scrollRef = useRef(); 
  const inputRef = useRef();
 const handleChange =async()=>      //function to set keyword for filtering
{
   setSearch(inputRef.current.value);
 }

  const searchFilter=()=>{          // filter the receivers
  if (search !== "") {
    const newList = mapFriend.filter((contact) => {
      return contact.data.toLowerCase().includes(search.toLowerCase());
    });
   if(newList)
   { 
     setfilterData(newList);
   }
   else
   setfilterData(mapFriend);
  }
  else
 {
    setfilterData(mapFriend);
 }

}

const getUser = async (friendId,ConversationId) => {      //storing all the receivers of  current user 
  try { 
    const res = await axios("http://localhost:8800/students/" + friendId);
    const data=res.data;
   setMapFriend((prev)=>[...prev,{friendId,data,ConversationId}]);
  } catch (err) {
    const data="mentor2"
    setMapFriend((prev)=>[...prev,{friendId,data,ConversationId}]);
   
  }
};

useEffect(()=>{
  const fun =async()=> {
  try{
    const conversation= await axios.get("http://localhost:8800/conv/"+currentChat);
      setF_id(conversation.data);
   }
   catch(err)
   { setF_id("");
     console.log(err);
   }
  }
  fun();
},[currentChat])

  useEffect(() => {                              //connection with socket and getting realtime messages
   // socket.current = io("ws://localhost:8900");
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: (data.text),
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {                            //updating the realtime messages if sender is same as currentchat
    if(currentChat?.members)
   { arrivalMessage &&flag&&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);}
      else
      {
        arrivalMessage &&flag&&
        f_id?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
      }
  }, [arrivalMessage, currentChat]);

  useEffect( () => {                                  //sending and storing current user data to socket 
     const ID=f_id?.members?.find((m)=>m!==user._id);  //and checking the current receiver is online or not
   // socket.current.emit("addUser", user._id);
  
    
    const k=onlineUsers?.find((user) => user.userId === (ID?ID:id));
    if(!k)
      setFlag(false);
      else
      setFlag(true);
 
  }, [currentChat,f_id,onlineUsers]);

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
 
  useEffect(() => {                          //setting initial currentchat based on url ID
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
      if(!receiver2)
      try { 
        const res = await axios.get("http://localhost:8800/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
      else
      { try {
          const res = await axios.get("http://localhost:8800/messages/" + currentChat);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {         //sending the message & notification to database and to socket  
    e.preventDefault();
    const message = {
      sender: user._id,
      text: (newMessage),
      conversationId: currentChat._id?currentChat._id:currentChat,
    };
    const ID=f_id?.members?.find((m)=>m!==user._id);
    if(flag)
   {
     socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: ID?ID:id,
      text: (newMessage),
    });
    
      socket.emit("sendNotification", {
        senderName: user.name,
        receiverId: ID?ID:id,
        type: 1,
      });
    }
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

  useEffect(()=>{                   //setting initial receiver
  if(!receiver2)
  {
   
   const  friendId=currentChat?.members.find((m)=>m!==user._id);
   const getUser = async () => {
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
  
  useEffect(()=>{
    for(let i=0;i<conversations.length;i++)
    {
      let friendId=conversations[i].members.find((m) => m !== user._id);
      getUser(friendId,conversations[i]._id);

    }

  },[conversations])

if(messages.length!==0)
  return (
    <>
    <div  className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper" >
        <input placeholder="Search for contacts" className="chatMenuInput" ref={inputRef} onChange={handleChange} />
        <button className="chatSubmitButton" onClick={searchFilter}>
                Search
              </button>

              {!filterData.length? mapFriend.map((c) => (
            <div onClick={() => {setReceiver2(c.data) ;setCurrentChat(c.ConversationId)}}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          )):
          filterData.map((c) => (
            <div onClick={() => {setReceiver2(c.data) ;setCurrentChat(c.ConversationId)}}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))
          }
      </div>
    </div>
   
    <div className="chatBox">
      <div className="chatBoxWrapper">
        {currentChat ? (
          <>
            <div className="chatBoxTop">
            <div className="receiverName">{receiver2?receiver2:receiver}</div>
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
          {!filterData.length? mapFriend.map((c) => (
            <div onClick={() => {setReceiver2(c.data) ;setCurrentChat(c.ConversationId)}}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          )):
          filterData.map((c) => (
            <div onClick={() => {setReceiver2(c.data) ;setCurrentChat(c.ConversationId)}}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))
          }
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
              <span className="noConversationText">
             Start a conversation with {receiver2}.
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
