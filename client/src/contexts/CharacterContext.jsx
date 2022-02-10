import React, { useState, createContext, useEffect } from "react";
import genshindb from "genshin-db";

export const CharacterContext = createContext();

export const CharacterProvider = (props) => {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		//get all character name in an array
		const allCharacterName = genshindb.characters("names", { matchCategories: true });
		//loop through the array and get details and talents for the character and push it into the state array
		let character;
		let talent;
		let results = [];
		allCharacterName.forEach((characterName) => {
			character = genshindb.characters(characterName);
			talent = genshindb.talents(characterName);
			results.push({ character, talent });
		});
		setCharacters(results);
		setLoading(false);
	}, []);

	return (
		<CharacterContext.Provider value={characters}>
			{loading ? <p>Loading</p> : props.children}
		</CharacterContext.Provider>
	);
};
