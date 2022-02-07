import React, { useEffect } from "react";
import CharacterTalentIcon from "./CharacterTalentIcon";

export default function CharacterDetailPane({ character }) {
	//console.log(character) on mount
	useEffect(() => {
		console.log(character);
	}, []);

	const getImageUrl = (image) => {
		return `https://res.cloudinary.com/genshin/image/upload/sprites/${image}.png`;
	};

	return (
		<div style={{ width: "700px" }}>
			<h1>{character.character.name}</h1>
			<div style={{ display: "flex" }}>
				<img
					src={character.character.images.icon}
					alt={character.character.name}
					style={{ width: "200px", height: "200px" }}
				/>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<p>Title: {character.character.title}</p>
					<p>Region: {character.character.region}</p>
					<p>Element: {character.character.element}</p>
					<p>Weapon: {character.character.weapontype}</p>
					<p>{character.character.description}</p>
				</div>
			</div>
			{character.talent && (
				<div className="talent-icon-container" style={{ display: "flex", width: "700px" }}>
					<CharacterTalentIcon
						talent={character.talent.combat1}
						image={getImageUrl(character.talent.images.combat1)}
					/>
					<CharacterTalentIcon
						talent={character.talent.combat2}
						image={getImageUrl(character.talent.images.combat2)}
					/>
					<CharacterTalentIcon
						talent={character.talent.combat3}
						image={getImageUrl(character.talent.images.combat3)}
					/>
					<CharacterTalentIcon
						talent={character.talent.passive1}
						image={getImageUrl(character.talent.images.passive1)}
					/>
					<CharacterTalentIcon
						talent={character.talent.passive2}
						image={getImageUrl(character.talent.images.passive2)}
					/>
					<CharacterTalentIcon
						talent={character.talent.passive3}
						image={getImageUrl(character.talent.images.passive3)}
					/>
				</div>
			)}
		</div>
	);
}
