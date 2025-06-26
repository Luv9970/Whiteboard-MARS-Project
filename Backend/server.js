const express = require("express");
const http = require("http");
const cors = require("cors");
// const { userJoin, getUsers, userLeave } = require("./utils/user");

const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("server");
});

let roomIdGlobal, imgURLGlobal;
// socket.io
let imageUrl, userRoom;
io.on("connection", (socket) => {


  socket.on("userJoined", (data) => {
    const { name, roomId, userId,  host, presenter } = data;
    socket.join(roomId);
    socket.emit("message", {
      message: "Welcome to ChatRoom",
    });

    roomIdGlobal = roomId;
    // const user = userJoin(socket.id, userName, roomId, host, presenter);
    // const roomUsers = getUsers(user.room);
    socket.broadcast.to(roomId).emit("WhiteboardDataResponse", {
      imageURL: imgURLGlobal,
    });

    // io.to(user.room).emit("users", roomUsers);
    // io.to(user.room).emit("canvasImage", imageUrl);
  });


  socket.on("whiteboareData", (data) => {
    imgURLGlobal = data;
    userRoom = socket.id; // Assuming socket.id is used as roomId
    socket.broadcast.to(roomIdGlobal).emit("WhiteboardDataResponse",{
      imageURL : data
    });
  })

  socket.on("drawing", (data) => {
    imageURL = data;
    socket.broadcast.to(userRoom).emit("canvasImage", imageURL);
  });

  socket.on("disconnect", () => {
    // const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    // if (userLeaves) {
    //   io.to(userLeaves.room).emit("message", {
    //     message: `${userLeaves.username} left the chat`,
    //   });
    //   io.to(userLeaves.room).emit("users", roomUsers);
    // }
  });
});

// serve on port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);