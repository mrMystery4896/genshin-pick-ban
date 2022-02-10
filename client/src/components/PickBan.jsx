import React, { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { useParams } from "react-router-dom";
import useUserId from "../hooks/useUserId";
import CharacterDetailPane from "./CharacterDetailPane";
import CharacterIcon from "./CharacterIcon";
import PickedBannedCharacters from "./PickedBannedCharacters";

export default function PickBan({ socket }) {
	const characters = useContext(CharacterContext);
	const [hoveredCharacter, setHoveredCharacter] = useState(characters[1]);
	const [roomData, setRoomData] = useState({
		roomId: "",
		password: "",
		players: [
			{ playerId: "", bannedCharacter: [], pickedCharacter: [], reserveTime: 120 },
			{ playerId: "", bannedCharacter: [], pickedCharacter: [], reserveTime: 120 },
		],
		turnCount: 0,
	});
	const [turnInfo, setTurnInfo] = useState({ action: "ban", isPlayersTurn: false });
	const [time, setTime] = useState(0);
	const [playerReserveTime, setPlayerReserveTime] = useState(120);
	const { roomId } = useParams();
	const userId = useUserId();

	useEffect(() => {
		//get new room data from server whenever a turn has passed
		socket.on("turnChanged", () => {
			socket.emit("getRoomData", roomId, userId, ({ turnInfo, roomData }) => {
				setTurnInfo(turnInfo);
				setRoomData(roomData);
			});
		});
		socket.emit("joinedRoom", roomId, userId, (res) => {
			setTurnInfo(res.turnInfo);
			setRoomData(res.room);
		});
		socket.on("timeChanged", (time) => {
			setTime(time);
		});

		return () => {
			socket.emit("leaveRoom", roomId, userId);
			socket.off();
		};
	}, []);

	useEffect(() => {
		getPlayerReserveTime();
	}, [roomData]);

	const pickCharacter = () => {
		socket.emit(
			"selectCharacter",
			hoveredCharacter.character.name,
			roomId,
			userId,
			(res) => {}
		);
	};

	const isSelected = (characterName) => {
		for (const player of roomData.players) {
			if (
				player.bannedCharacter.includes(characterName) ||
				player.pickedCharacter.includes(characterName)
			)
				return true;
		}
		return false;
	};

	const displayTurnMessage = () => {
		let player = turnInfo.isPlayersTurn ? "Your" : "Opponent's";
		let action = turnInfo.action;
		return `${player} turn to ${action}`;
	};

	const getPlayerReserveTime = () => {
		const player = roomData.players.find((player) => player.playerId === userId);
		setPlayerReserveTime(player?.reserveTime);
	};

	return (
		<div>
			<h1>Pick Ban</h1>
			<h2>{displayTurnMessage()}</h2>
			<h2>Reserve Time: {playerReserveTime}</h2>
			<h2>{time}</h2>
			<div style={{ display: "flex", flexWrap: "wrap", width: "80%" }}>
				{characters &&
					characters.map((character) => {
						return (
							<CharacterIcon
								onClick={() => {
									setHoveredCharacter(character);
								}}
								character={character.character}
								grayScale={isSelected(character.character.name)}
								key={character.character.name}
							/>
						);
					})}
			</div>
			<CharacterDetailPane character={hoveredCharacter} />
			<button
				disabled={!turnInfo.isPlayersTurn || isSelected(hoveredCharacter.character.name)}
				onClick={pickCharacter}
			>
				Select {hoveredCharacter.character.name}
			</button>
			{roomData.players.map((player, index) => (
				<PickedBannedCharacters key={index} player={player} />
			))}
		</div>
	);
}
