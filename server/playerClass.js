module.exports = class Player {
	playerId = "";
	bannedCharacter = [];
	pickedCharacter = [];
	reserveTime = 120;

	constructor(playerId) {
		if (playerId) this.playerId = playerId;
		else this.playerId = "";
	}
};
