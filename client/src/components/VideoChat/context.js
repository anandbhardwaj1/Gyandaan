import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { useUserContext } from '../../context/userContext';

const SocketContext = createContext();




const CProvider = ({ children }) => {
   const {socket}=useUserContext();
   
     const [flag,setflag]=useState(false);
    const [myVdoStatus, setMyVdoStatus] = useState(true);
    const [myMicStatus, setMyMicStatus] = useState(true);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [otherUser, setOtherUser] = useState("");
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
 const [data,setData]=useState([]);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();


 

  const updateVideo = () => {
    

    setMyVdoStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      stream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
    
      
  };

  const updateMic = () => {
    setMyMicStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      });
      stream.getAudioTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
    
    
  };

  useEffect(() => {
      if(flag)
    navigator.mediaDevices.getUserMedia({ video:true, audio:(true)})
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });
     
     if(socket)
    socket.on('me', (id) => setMe(id));
    if(socket)
    { socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    socket.on("endCall", () => {
        window.location.reload();
      });
     
      socket.on("getUsers",(data)=>{
        
        setData(data);
       });
      socket.on("callEnded",() => {
        const res=data?.find((user) => user.socketId === otherUser);
        if(!res)
        {
            window.location.reload();
        }
      })
     }

  }, [flag]);
  
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
     
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setOtherUser(id);
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
    
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("endCall", { id: otherUser });
    connectionRef.current.destroy();

    window.location.reload();
  };

  

  return (
    <SocketContext.Provider value={{
      call,flag,
      setflag,
      callAccepted,
      myVideo,
      myVdoStatus,
        setMyVdoStatus,
        myMicStatus,
        setMyMicStatus,
        updateVideo,
        updateMic,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { CProvider, SocketContext };
