import React from "react";

export default function CharacterDetailPane({ character }) {
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
				<div className='talent-icon-container' style={{ display: "flex", width: "700px" }}>
					<img
						src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.talent.images.combat1}.png`}
						alt={character.talent.combat1.name}
					/>
					<img
						src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.talent.images.combat2}.png`}
						alt={character.talent.combat2.name}
					/>
					<img
						src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.talent.images.combat3}.png`}
						alt={character.talent.combat3.name}
					/>
					<img
						src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.talent.images.passive1}.png`}
						alt={character.talent.passive1.name}
					/>
					<img
						src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.talent.images.passive2}.png`}
						alt={character.talent.passive2.name}
					/>
					<img
						src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.talent.images.passive3}.png`}
						alt={character.talent.passive3.name}
					/>
				</div>
			)}
		</div>
	);
}
