const express = require("express");
const Player = require("./playerClass");
const router = express.Router();
const { rooms, addRoom } = require("./rooms");

router.get("/", (req, res) => {
	res.send("Server is up and running!");
});

router.post("/create", (req, res) => {
	addRoom(req.body.roomId, req.body.password, req.body.userId);
	res.send(rooms);
});

router.post("/join", (req, res) => {
	if (req.body.spectator) {
		const matchedRoom = rooms.find((room) => room.roomId === req.body.roomId);
		if (matchedRoom) {
			res.send({ roomId: matchedRoom.roomId });
		} else {
			res.send({ error: "No room ID found" });
		}
	} else {
		const matchedRoom = rooms.find(
			(room) => room.roomId === req.body.roomId && room.password === req.body.password
		);
		if (!matchedRoom) {
			res.send({
				error: "Incorrect Room ID or password",
			});
		} else if (matchedRoom.isFull()) {
			res.send({
				error: "Room already has 2 players",
			});
		} else {
			matchedRoom.addPlayer(new Player(req.body.userId));
			res.send({ roomId: matchedRoom.roomId });
		}
	}
});

module.exports = router;
