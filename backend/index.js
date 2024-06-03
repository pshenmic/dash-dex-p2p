require("dotenv").config();

const express = require("express");
require('express-async-errors')
const session = require('express-session');
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const usersRoutes = require("./users/usersRoutes");
const offersRoutes = require("./offers/offersRoutes");
const ordersRouters = require("./orders/ordersRoutes");
const chatRouters = require("./chat/chatRoutes");
const errorHandler = require("./middlewares/errorHandler");

const secret = process.env.SESSION_SECRET || "default";

// Use express-session middleware
server.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false, 
    httpOnly: true,
  },
}));

server.use(helmet());
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/auth", usersRoutes);
server.use("/api/offers", offersRoutes);
server.use("/api/orders", ordersRouters);
server.use("/api/chat", chatRouters);

server.use((err, req, res, next) => {
  errorHandler(err,res,next)
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "Local Bitcoin Clone API" });
});

server.all("*", (req, res) => {
  res.status(404).send({
    error: "The resource you are looking for does not exist",
  });
});

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "test") {

  const serverIO = server.listen(
    port,
    console.log(`Listening on Port ${port}`)
  );

  const io = require("./socket").init(serverIO);
  io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
      console.log("joined room");
      socket.join(room);
    });
    console.log("cient connected");
  });

}
module.exports = server;
