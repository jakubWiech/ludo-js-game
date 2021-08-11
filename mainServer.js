const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const newUser = require("./components/newUser.js").newUser;
const handleUser = require("./components/newUser.js").handleUser;
const findRoom = require("./components/findRoom.js").findRoom;
const quitGame = require("./components/quitGame.js").quitGame;
const changeReady = require("./components/changeReady.js").changeReady;

var roomArray = [];

const colors = {
  red: "#F5332B",
  green: "#37DE53",
  yellow: "#F5D547",
  blue: "#54B4F5"
}

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
    res.redirect("/game")
  } else {
    res.sendFile(path.join(__dirname + "/client/connect.html"));
  }
});

app.get("/changeReadyState", function (req, res) {
  changeReady(roomArray, req.session.roomID, req.session.playerID, req.session.playerName);
  res.end();
});

app.get("/scripts/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/client" + req.url));
});

app.get("/styles/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/client" + req.url));
});

app.get("/img/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/client" + req.url));
});

app.get("/game", function (req, res) {
  if (req.session.roomID) {
    res.sendFile(path.join(__dirname + "/client/game.html"))
  } else {
    res.redirect("/")
  }
})

app.post("/connectToGame", function (req, res) {
  newUser(req.body.nickname);
  handleUser(req.body.nickname, roomArray, req.session);
  res.end(JSON.stringify({id: req.session.playerID}))
});

app.post("/updatePawns", function (req, res) {
  if (req.session.movable) {
    let target = roomArray.find(room => room.id == req.session.roomID)
    switch (req.body.color) {
      case "red":
        target.pawns.red[req.body.id] = req.body.value
        break
      case "yellow":
        target.pawns.yellow[req.body.id] = req.body.value
        break
      case "green":
        target.pawns.green[req.body.id] = req.body.value
        break
      case "blue":
        target.pawns.blue[req.body.id] = req.body.value
        break
    }
    target.skipRound()
  } else {
    res.end()
  }
})

app.get("/destroySession", function (req, res) {
  quitGame(roomArray, req.session);
  req.session.destroy();

  res.end()
});

app.get("/findRoom", function (req, res) {
  if (req.session.roomID) {
    let neededResp = findRoom(roomArray, req.session, "fetch");
    res.end(JSON.stringify(neededResp));
  } else {
    res.end()
  }
});

app.get("/rollTheDice", function (req, res) {
  if (req.session.movable && !req.session.afterDiceRoll) {
    let resp = { num: Math.floor(Math.random() * 6) + 1}
    resp.movablePawns = findRoom(roomArray, req.session, "rolldice", resp.num).pawns
    resp.playerID = req.session.playerID
    //let result = game.outputMovablePawns(game.colorIndexes[req.session.playerID], resp.num)
    console.log(resp.movablePawns)
    req.session.afterDiceRoll = true
    req.session.diceOutput = resp.num
    res.end(JSON.stringify(resp))
  } else {
    res.end()
  }
})

app.get("/skipround", function (req, res) {
  if(req.session.movable){
    req.session.afterDiceRoll = false
    let target = roomArray.find(room => room.id == req.session.roomID)
    target.skipRound()
  }
  res.end()
})

app.get("/getColor", function(req, res){
  if(req.session.movable){
    res.end(JSON.stringify({color: req.session.playerID}))
  }
})

app.post("/movePawn", function (req, res) {
  if(req.session.movable && req.session.afterDiceRoll){
    req.session.afterDiceRoll = false
    console.log(req.body.pawnToMove)
    let resp = findRoom(roomArray, req.session, "move", req.session.diceOutput, req.body.pawnToMove)
    res.end(JSON.stringify(resp))
  }else{
    res.end()
  }
})

app.listen(port, function () {
  console.log("Serwer ruszył na", port);
});
