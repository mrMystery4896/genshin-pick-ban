import React from "react";
import TalentPopUp from "./TalentPopUp";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

export default function CharacterTalentIcon({ talent, image }) {
	return (
		<>
			<Tippy content={<TalentPopUp talent={talent} />} placement="right">
				<img src={image} alt={talent} />
			</Tippy>
		</>
	);
}
