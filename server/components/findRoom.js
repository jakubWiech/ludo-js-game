module.exports.findRoom = function (id, roomArray) {
    return roomArray.find(room => room.id == id)
}