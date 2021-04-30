module.exports.quitGame = function (roomArray, session) {
    let targetRoom = roomArray.find(room => room.id == session.roomID)
    let targetElem = targetRoom.players.find(player => player.id == session.playerID && player.name == session.playerName)
    let targetPosition = targetRoom.players.indexOf(targetElem)
    console.log(targetPosition)
    targetRoom.players.splice(targetPosition, 1)
    if (targetRoom.players.length == 0) {
        let emptyRoom = roomArray.indexOf(targetRoom)
        roomArray.splice(emptyRoom, 1)
    }
}