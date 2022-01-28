import React, { useState, useEffect } from "react";
import PickBan from "./PickBan";
import Spectate from "./Spectate";
import { useParams } from "react-router-dom";
import useUserId from "../hooks/useUserId";
import io from "socket.io-client";

let socket;

export default function Room() {
	const { roomId } = useParams();
	const userId = useUserId();
	const [isSpectator, setIsSpectator] = useState(true);
	const [loading, setLoading] = useState(true);
	const ENDPOINT = "http://localhost:5000";

	useEffect(() => {
		setLoading(true);
		socket = io(ENDPOINT);
		socket.emit("join", { roomId, userId }, (res) => {
			setIsSpectator(!res);
			setLoading(false);
		});
	}, []);

	return loading ? (
		<h1>Loading...</h1>
	) : isSpectator ? (
		<Spectate socket={socket} />
	) : (
		<PickBan socket={socket} />
	);
}
