const Room = require("./roomClass");

let rooms = [];

function addRoom(roomId, password, userId) {
	let room = new Room(roomId, password, userId);
	rooms.push(room);
}

function checkPlayerIsInRoom(roomId, userId) {
	let room = rooms.find((room) => room.roomId === roomId);
	if (!room) return false;
	// console.log("userId", userId);
	// console.log(
	// 	"player is in room",
	// 	room.players.some((player) => player.playerId === userId)
	// );
	if (room.players.some((player) => player.playerId === userId)) {
		return true;
	}
	return false;
}

function getRoom(roomId) {
	return rooms.find((room) => room.roomId === roomId);
}

module.exports = { addRoom, getRoom, checkPlayerIsInRoom, rooms };
