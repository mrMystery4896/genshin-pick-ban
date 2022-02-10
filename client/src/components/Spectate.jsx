import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserId from "../hooks/useUserId";
import PickedBannedCharacters from "./PickedBannedCharacters";

export default function Spectate({ socket }) {
	const [roomData, setRoomData] = useState({});
	const [time, setTime] = useState(30);
	const { roomId } = useParams();

	useEffect(() => {
		socket.on("turnChanged", () => {
			socket.emit("spectatorGetRoomData", roomId, (res) => {
				setRoomData(res);
			});
		});

		socket.emit("spectatorGetRoomData", roomId, (res) => {
			setRoomData(res);
		});

		socket.on("timeChanged", (time) => {
			setTime(time);
		});

		return () => {
			socket.off();
		};
	}, []);

	return roomData.players ? (
		<div>
			<h1>Spectate</h1>
			<h1>{time}</h1>
			{roomData.players.map((player, index) => {
				return <PickedBannedCharacters key={index} player={player} />;
			})}
		</div>
	) : (
		""
	);
}
