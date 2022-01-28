const Player = require("./playerClass");

module.exports = class Room {
	roomId = "";
	password = "";
	players = [];
	turnCount = 0;
	currentTime = 30;
	static pickBanOrder = [
		{
			player: 0,
			action: "ban",
		},
		{
			player: 1,
			action: "ban",
		},
		{
			player: 0,
			action: "ban",
		},
		{
			player: 1,
			action: "ban",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 1,
			action: "pick",
		},
		{
			player: 1,
			action: "pick",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 1,
			action: "pick",
		},
		{
			player: 1,
			action: "pick",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 0,
			action: "ban",
		},
		{
			player: 1,
			action: "ban",
		},
		{
			player: 1,
			action: "pick",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 1,
			action: "pick",
		},
		{
			player: 1,
			action: "pick",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 0,
			action: "pick",
		},
		{
			player: 1,
			action: "pick",
		},
	];

	constructor(roomId, password, userId) {
		this.roomId = roomId;
		this.password = password;
		this.players = [new Player(), new Player()];
		if (userId) {
			this.players[0] = new Player(userId);
		}
	}

	isFull() {
		if (this.players.some((player) => player.playerId.length)) {
			return false;
		}
		return true;
	}

	addPlayer(player) {
		//room cannot have more than 2 players
		if (this.isFull()) return;
		//check if user already exists in the room
		if (this.players.some((p) => p.playerId === player.playerId)) return;
		let index = this.players
			.map((e) => {
				return e.playerId;
			})
			.indexOf("");
		this.players[index] = player;
	}

	getPlayerNumber(playerId) {
		return this.players.findIndex((player) => player.playerId === playerId);
	}

	isPlayersTurn(playerId) {
		let index = this.getPlayerNumber(playerId);
		if (Room.pickBanOrder[this.turnCount].player === index) {
			return true;
		}
		return false;
	}

	selectCharacter(characterName, playerId) {
		if (this.isPlayersTurn(playerId)) {
			if (Room.pickBanOrder[this.turnCount].action === "ban") {
				this.players[this.getPlayerNumber(playerId)].bannedCharacter.push(characterName);
				this.turnCount++;
				this.currentTime = 30;
			} else {
				this.players[this.getPlayerNumber(playerId)].pickedCharacter.push(characterName);
				this.turnCount++;
				this.currentTime = 30;
			}
		}
	}
};
