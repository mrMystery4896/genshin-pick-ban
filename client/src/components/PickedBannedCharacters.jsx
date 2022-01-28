import React from "react";

export default function PickedBannedCharacters({ player, index: key }) {
	return (
		<div>
			<h1>Player {key}</h1>
			<h3>Banned:</h3>
			<ul>
				{player.bannedCharacter.map((char) => (
					<li key={char}>{char}</li>
				))}
			</ul>
			<h3>Picked:</h3>
			<ul>
				{player.pickedCharacter.map((char) => (
					<li key={char}>{char}</li>
				))}
			</ul>
		</div>
	);
}
