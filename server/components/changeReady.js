module.exports.changeReady = function (roomArray, roomId, playerId) {
  let room = roomArray.find((room) => room.id == roomId);
  room.players[playerId].ready = !room.players[playerId].ready;
};
