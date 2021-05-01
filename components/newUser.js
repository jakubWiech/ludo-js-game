const gameRoom = require("../classes/gameRoom.js").gameRoom;

module.exports.newUser = function (nickname) {
  console.log("Pojawił się chłop o nicku", nickname);
};

module.exports.handleUser = function (nickname, roomArray, session) {
  if (roomArray.length == 0) {
    let newRoom = new gameRoom(roomArray, 300);
    newRoom.addPlayer({ name: nickname, id: 0, ready: false });
    roomArray.push(newRoom);
    session.roomID = newRoom.id;
    session.playerName = nickname;
    session.playerID = 0;
    console.log("nowy room");
  } else {
    roomArray.forEach((room, i) => {
      if (room.players.length < 4 && room.gameRunning == false) {
        room.addPlayer({
          name: nickname,
          id: room.players.length,
          ready: false
        });
        session.roomID = room.id;
        session.playerName = nickname;
        session.playerID = room.players.length - 1;
        console.log("dodano");
      } else if (room.players.length == 4 || room.gameRunning == true && i == roomArray.length - 1) {
        let newRoom = new gameRoom(roomArray, 300);
        newRoom.addPlayer({ name: nickname, id: 0, ready: false });
        roomArray.push(newRoom);
        session.roomID = newRoom.id;
        session.playerName = nickname;
        session.playerID = 0;
        console.log("nowy room");
      }
    });
  }
};
