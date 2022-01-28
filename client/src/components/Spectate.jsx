import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserId from "../hooks/useUserId";
import PickedBannedCharacters from "./PickedBannedCharacters";

export default function Spectate({ socket }) {
	const [roomData, setRoomData] = useState({});
	const { roomId } = useParams();
	const userId = useUserId();

	useEffect(() => {
		socket.on("turnChanged", () => {
			console.log("turnChanged");
			socket.emit("spectatorGetRoomData", roomId, (res) => {
				console.log("spectatorGetRoomData emitted");
				setRoomData(res);
			});
		});

		socket.emit("spectatorGetRoomData", roomId, (res) => {
			console.log("spectatorGetRoomData emitted");
			setRoomData(res);
		});

		return () => {
			socket.off();
		};
	}, []);

	useEffect(() => {
		console.log("Room Data: ", roomData);
	}, [roomData]);

	return roomData.players ? (
		<div>
			<h1>Spectate</h1>
			{roomData.players.map((player, index) => {
				return <PickedBannedCharacters key={index} player={player} />;
			})}
		</div>
	) : (
		""
	);
}
