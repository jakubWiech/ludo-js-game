module.exports.changeReady = function (roomArray, roomId, playerId, playerName) {
  let targetRoom = roomArray.find((room) => room.id == roomId);
  let targetPlayer = targetRoom.players.find((player) => player.id == playerId && player.name == playerName)
  targetPlayer.ready = !targetPlayer.ready
};
