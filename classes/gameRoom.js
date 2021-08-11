const ludoGame = require("../components/ludoGame.js").mainGame;

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
        this.currentPlayer = 0
        this.moveTime = 30
        this.ludoGame = new ludoGame
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
        this.amountPlayers = this.players.length
        this.round = 0
        this.currentPlayer = this.round % this.amountPlayers
    }

    skipRound = function () {
        this.round++
        this.currentPlayer = this.round % this.amountPlayers
        this.moveTime = 30
    }
}

module.exports.gameRoom = gameRoom