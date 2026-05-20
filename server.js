const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/controller.html");
});

io.on("connection", (socket) => {
  console.log("Device connected:", socket.id);

  socket.on("playVideo", (video) => {
    io.emit("playVideo", video);
  });

  socket.on("blankScreen", () => {
    io.emit("blankScreen");
  });

  socket.on("pauseVideo", () => {
    io.emit("pauseVideo");
  });

  socket.on("resumeVideo", () => {
    io.emit("resumeVideo");
  });

  socket.on("disconnect", () => {
    console.log("Device disconnected:", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`iPad Video Controller running on port ${PORT}`);
});