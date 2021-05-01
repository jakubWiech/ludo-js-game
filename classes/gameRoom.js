const session = require('express-session')
const uniqid = require('uniqid')
class gameRoom {
    constructor(roomArray) {
        this.id = uniqid('room-')
        this.players = []
        this.gameRunning = false
        this.roomExpires = 300
        this.allRooms = roomArray
        this.expirement = setInterval(this.checkRoom.bind(this), 1000)
        this.currentPlayer = ""
        this.moveTime = 30
    }

    addPlayer = function (nickname) {
        this.players.push(nickname)
    }

    renewRoomExpire = function () {
        this.roomExpires = 300
    }

    checkRoom = function () {
        if (this.roomExpires > 0) {
            this.roomExpires--
            console.log(this.roomExpires)
        } else {
            this.destroyRoom(this.allRooms)
            clearInterval(this.expirement)
        }
        if (this.gameRunning) {
            if (this.moveTime <= 0) {
                this.skipRound()
            }
            this.moveTime--
        }
    }

    destroyRoom = function (roomArray) {
        let id = roomArray.indexOf(this)
        roomArray.splice(id, 1)
    }

    startGame = function () {
        this.gameRunning = true
        this.setupPawns()
        this.amountPlayers = this.players.length
        this.round = 0
        this.currentPlayer = this.players[this.round % this.amountPlayers]
    }

    skipRound = function () {
        this.round++
        this.currentPlayer = this.players[this.round % this.amountPlayers]
        this.moveTime = 30
    }

    setupPawns = function () {
        this.pawns = {
            red: [-1, -2, -3, -4],
            yellow: [-1, -2, -3, -4],
            green: [-1, -2, -3, -4],
            blue: [-1, -2, -3, -4],
        }
    }
}

module.exports.gameRoom = gameRoom