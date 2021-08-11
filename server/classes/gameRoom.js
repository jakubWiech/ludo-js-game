const uniqid = require('uniqid')
class gameRoom {
    constructor() {
        this.id = uniqid('room-')
        this.players = []
        this.gameRunning = false
    }

    addPlayer = function (nickname) {
        this.players.push(nickname)
    }

    startGame = function () {
        this.gameRunning = true
    }
}

module.exports.gameRoom = gameRoom