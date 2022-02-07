import React from "react";

export default function TalentPopUp({ talent }) {
	return (
		<div>
			<h1>{talent.name}</h1>
			<p>{talent.info}</p>
		</div>
	);
}
