const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const bp = require("body-parser");
const router = require("./router");
const { checkPlayerIsInRoom, getRoom } = require("./rooms");
const Room = require("./roomClass");
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const PORT = process.env.PORT || 5000;

//middleware
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(router);
//middleware

io.on("connection", (socket) => {
	console.log("We have a new connection");

	//when a user joins a room, we check if that player is in the player list, if yes (user is a player)
	//return true, else (user is a spectator), return false
	socket.on("join", ({ roomId, userId }, callback) => {
		const playerIsInRoom = checkPlayerIsInRoom(roomId, userId);
		socket.join(roomId);
		callback(playerIsInRoom);
	});

	//when user initially joins the room, return if current turn is his turn
	socket.on("joinedRoom", (roomId, userId, callback) => {
		let room = getRoom(roomId);
		callback({
			room,
			turnInfo: {
				action: Room.pickBanOrder[room.turnCount].action,
				isPlayersTurn: room.isPlayersTurn(userId),
			},
		});
	});

	//this is triggered whenever a character selects a character, after characterName has been pushed into
	//the pickedCharacter/bannedCharacter array, emit a turnChanged event to client side.
	socket.on("selectCharacter", (characterName, roomId, userId, callback) => {
		let room = getRoom(roomId);
		room.selectCharacter(characterName, userId);
		io.to(roomId).emit("turnChanged");
		callback(room);
	});

	socket.on("getRoomData", (roomId, userId, callback) => {
		let room = getRoom(roomId);
		let isPlayersTurn = room.isPlayersTurn(userId);
		let turnType = Room.pickBanOrder[room.turnCount].action;
		return callback({ roomData: room, turnInfo: { action: turnType, isPlayersTurn } });
	});

	socket.on("spectatorGetRoomData", (roomId, callback) => {
		let matchedRoom = getRoom(roomId);
		return callback(matchedRoom);
	});

	socket.on("timerStart", (roomId) => {
		let room = getRoom(roomId);
		let countDown = setInterval(() => {
			if (room.currentTime > 0) {
				io.to(roomId).emit("timeChanged", room.currentTime);
				room.currentTime--;
			}
			//when 30 seconds is over and player does not have reserve time, increment turn count
			if (
				room.currentTime === 0 &&
				room.players[Room.pickBanOrder[room.turnCount].player].reserveTime === 0
			) {
				room.currentTime = 30;
				room.turnCount++;
				io.to(roomId).emit("turnChanged");
			} //when 30 seconds is over and player still has reserve time, start startReserveTime function
			else if (
				room.currentTime === 0 &&
				room.players[Room.pickBanOrder[room.turnCount].player].reserveTime > 0
			) {
				let currentPlayer = room.players[Room.pickBanOrder[room.turnCount].player];
				io.to(room.roomId).emit("timeChanged", currentPlayer.reserveTime);
				currentPlayer.reserveTime--;
			}
		}, 1000);
	});

	socket.on("leaveRoom", (roomId, userId) => {
		let room = getRoom(roomId);
		console.log(room);
		//remove user from player list
		// if (room.players[0].playerId === userId) {
		// 	room.players[0].playerId = "";
		// } else {
		// 	room.players[1].playerId = "";
		// }
	});

	//disconnect
	socket.on("disconnect", () => {
		console.log("User has disconnected");
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
