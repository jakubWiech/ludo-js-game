module.exports.findRoom = function (id, playerId, playerName, roomArray, session) {
    let respRoom = roomArray.find(room => room.id == id)
    respRoom.renewRoomExpire()
    let movable = false
    let playerState = respRoom.players.find(player => player.id == playerId && player.name == playerName)
    if (!respRoom.gameRunning) {
        let readyPlayers = 0
        respRoom.players.forEach(player => {
            if (player.ready) {
                readyPlayers++
            }
        })
        if (respRoom.players.length == 4 || readyPlayers >= 2) {
            respRoom.startGame()
        }
    } else {
        if (playerState == respRoom.currentPlayer) {
            movable = true;
            session.movable = true;
        } else {
            movable = false;
            session.movable = false;
        }
    }

    if (!session.color && respRoom.gameRunning) {
        let colors = ["red", "yellow", "green", "blue"]
        session.color = colors[respRoom.players.indexOf(playerState)]
    }

    playerState = playerState.ready

    return ({ room: { players: respRoom.players, gameStatus: respRoom.gameRunning, whosMove: respRoom.currentPlayer, moveTime: respRoom.moveTime, pawns: respRoom.pawns }, myColor: session.color, isItMyMove: movable, ready: playerState })
}