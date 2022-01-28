import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";
import useUserId from "../hooks/useUserId";

Modal.setAppElement("#root");

export default function CreateOrJoinRoomButton({ type }) {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState("");
	const [joinAsSpectator, setJoinAsSpectator] = useState(false);
	const roomRef = useRef("");
	const passwordRef = useRef("");
	const navigate = useNavigate();
	const userId = useUserId();

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setError("");
		setIsOpen(false);
	};

	const createRoom = () => {
		if (!passwordRef.current.value) {
			setError("Please enter a password");
			return;
		}
		const roomId = v4();
		const data = {
			roomId,
			password: passwordRef.current.value,
			userId,
		};
		axios.post("http://localhost:5000/create", data).then((res) => {
			if (res.data.error) {
				setError(res.data.error);
			} else {
				navigate(`/room/${roomId}`);
			}
		});
	};

	const joinRoom = async () => {
		let data;
		//check if user joins as spectator
		if (joinAsSpectator) {
			data = {
				spectator: joinAsSpectator,
				roomId: roomRef.current.value,
				password: "",
				userId,
			};
		} else {
			data = {
				spectator: joinAsSpectator,
				roomId: roomRef.current.value,
				password: passwordRef.current.value,
				userId,
			};
		}
		axios.post("http://localhost:5000/join", data).then((res) => {
			if (res.data.error) {
				setError(res.data.error);
			} else {
				navigate(`/room/${res.data.roomId}`);
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (type === "create") {
			createRoom();
		} else {
			joinRoom();
		}
	};

	return (
		<div>
			<button onClick={openModal}>{type === "create" ? "Create" : "Join"} Room</button>
			<Modal isOpen={isOpen} onRequestClose={closeModal}>
				<h1>{type === "create" ? "Create" : "Join"} Room</h1>
				<p>{error ? error : ""}</p>
				<form onSubmit={handleSubmit}>
					{type === "create" ? (
						""
					) : (
						<>
							<label htmlFor='roomId'>Room ID: </label>
							<input ref={roomRef} type='text' name='roomId' />
						</>
					)}
					{joinAsSpectator ? (
						""
					) : (
						<>
							<label htmlFor='password'>Password:</label>
							<input ref={passwordRef} type='password' name='password' />
						</>
					)}
					{type === "join" ? (
						<>
							<input
								onChange={(e) => {
									setJoinAsSpectator(e.target.checked);
								}}
								type='checkbox'
								name='joinAsSpectator'
							/>
							<label htmlFor='joinAsSpectator'>Join As Spectator</label>
						</>
					) : (
						""
					)}
					<button type='submit'>{type === "create" ? "Create" : "Join"} Room</button>
				</form>
			</Modal>
		</div>
	);
}
