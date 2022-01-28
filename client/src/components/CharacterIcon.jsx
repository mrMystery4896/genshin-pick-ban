import React from "react";

export default function CharacterIcon({ character, onClick, grayScale }) {
	return (
		<div onClick={onClick}>
			<img
				src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.images.nameiconcard}.png`}
				alt={character.name}
				style={
					grayScale
						? { width: "150px", height: "150px", filter: "grayscale(100%)" }
						: { width: "150px", height: "150px" }
				}
			/>
		</div>
	);
}
