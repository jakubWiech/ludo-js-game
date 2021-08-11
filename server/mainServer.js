const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const newUser = require("./components/newUser.js").newUser;
const handleUser = require("./components/newUser.js").handleUser;
const findRoom = require("./components/findRoom.js").findRoom;
const quitGame = require("./components/quitGame.js").quitGame;
const changeReady = require("./components/changeReady.js").changeReady;

var roomArray = [];

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());

app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: "secret" }));

app.get("/", function (req, res) {
  if (req.session.roomID) {
    res.sendFile(path.join(__dirname + "./../client/game.html"));
  } else {
    res.sendFile(path.join(__dirname + "./../client/connect.html"));
  }
});

app.get("/changeReadyState", function (req, res) {
  changeReady(roomArray, req.session.roomID, req.session.playerID);
  res.end();
});

app.get("/scripts/*", function (req, res) {
  res.sendFile(path.join(__dirname + "./../client" + req.url));
});

app.get("/styles/*", function (req, res) {
  res.sendFile(path.join(__dirname + "./../client" + req.url));
});

app.post("/connectToGame", function (req, res) {
  newUser(req.body.nickname);
  handleUser(req.body.nickname, roomArray, req.session);
  res.redirect("/");
});

app.post("/destroySession", function (req, res) {
  quitGame(roomArray, req.session);
  console.log(roomArray);
  req.session.destroy();
  res.redirect("/");
});

app.get("/findRoom", function (req, res) {
  let neededRoom = findRoom(req.session.roomID, roomArray);
  res.end(JSON.stringify(neededRoom));
});

app.listen(port, function () {
  console.log("Serwer ruszył na", port);
});
