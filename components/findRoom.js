module.exports.findRoom = function (roomArray, session, mode, move = 0, pawnToMove = 0) {
    let respRoom = roomArray.find(room => room.id == session.roomID)
    respRoom.renewRoomExpire()
    let movable = false
    let colors = ["red", "yellow", "green", "blue"]
    let requestingPlayer = respRoom.players.find(player => player.id == session.playerID && player.name == session.playerName)
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
        if (requestingPlayer == respRoom.players[respRoom.currentPlayer]) {
            movable = true;
            session.movable = true;
        } else {
            movable = false;
            session.movable = false;
        }
    }

    if (!session.color && respRoom.gameRunning) {
        session.color = colors[respRoom.players.indexOf(requestingPlayer)]
    }

    let winner = respRoom.ludoGame.checkWin()
    if(winner != null){
        winner = respRoom.players[winner]
    }

    switch(mode){
        case "fetch":
            return ({ 
                room: { 
                    players: respRoom.players, 
                    gameStatus: respRoom.gameRunning, 
                    whosMove: respRoom.players[respRoom.currentPlayer], 
                    moveTime: respRoom.moveTime, pawns: respRoom.ludoGame.getPawnsArray() 
                }, 
                myColor: session.color, 
                isItMyMove: movable,
                ready: requestingPlayer.ready,
                winner: winner
            })
        case "rolldice":
            return ({
                pawns: respRoom.ludoGame.outputMovablePawns(session.playerID, move)
            })
        case "move":
            respRoom.ludoGame.updatePawns(colors[session.playerID], pawnToMove, move)
            return ({ 
                room: { 
                    players: respRoom.players, 
                    gameStatus: respRoom.gameRunning, 
                    whosMove: respRoom.players[respRoom.currentPlayer], 
                    moveTime: respRoom.moveTime, pawns: respRoom.ludoGame.getPawnsArray() 
                }, 
                myColor: session.color, 
                isItMyMove: movable, ready: 
                requestingPlayer.ready 
            })
    }
}