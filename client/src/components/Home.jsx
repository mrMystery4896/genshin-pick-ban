import React from "react";
import CreateOrJoinRoomButton from "./CreateOrJoinRoomButton";

export default function Home() {
	return (
		<>
			<h1>Home</h1>
			<CreateOrJoinRoomButton type='create' />
			<CreateOrJoinRoomButton type='join' />
		</>
	);
}
