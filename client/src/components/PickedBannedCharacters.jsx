import React, { useEffect, useState, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

export default function PickedBannedCharacters({ player, index: key }) {
	const characters = useContext(CharacterContext);
	const [bannedCharacterImages, setBannedCharacterImage] = useState([]);
	const [pickedCharacterImages, setPickedCharacterImage] = useState([]);

	useEffect(() => {
		const bannedCharacterImages = player.bannedCharacter.map((character) => {
			return characters.find((char) => char.character.name === character).character.images
				.sideicon;
		});
		const pickedCharacterImages = player.pickedCharacter.map((character) => {
			return characters.find((char) => char.character.name === character).character.images
				.sideicon;
		});
		setPickedCharacterImage(pickedCharacterImages);
		setBannedCharacterImage(bannedCharacterImages);
	}, [player.bannedCharacter]);

	return (
		<div>
			<h1>Player {key}</h1>
			<h3>Banned:</h3>
			<ul>
				{bannedCharacterImages.map((char) => (
					<li key={char}>
						<img src={char} alt={char} />
					</li>
				))}
			</ul>
			<h3>Picked:</h3>
			<ul>
				{pickedCharacterImages.map((char) => (
					<li key={char}>
						<img src={char} alt={char} />
					</li>
				))}
			</ul>
		</div>
	);
}
