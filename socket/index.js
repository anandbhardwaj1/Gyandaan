const io = require("socket.io")(8900, {
  
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  
  socket.emit("me", socket.id);
  console.log("a user connected.");

  socket.on("addUser", (userId) => {
   
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
  //send notification
  socket.on("sendNotification", ({ senderName, receiverId, type }) => {
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  //call a user 
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {

		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});
  //
  socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
    socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
  });

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

  
  socket.on("endCall", ({ id }) => {
    io.to(id).emit("endCall");
  });
  //when disconnect
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
