import "./globals.scss";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./Components/Chat/Chat";
import Logo from "./Assets/Images/logo.svg";

const socket = io("http://localhost:3002");

function App() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChat(true);
		}
	};

	const leaveRoom = () => {
		setShowChat(false);
		// window.location.reload(false);
	};

	return (
		<>
			{!showChat ? (
				<div className="form-wrapper">
					<img src={Logo} className="logo" alt="logo" />

					<div className="input-wrapper">
						<input
							className="field"
							type="text"
							placeholder="Apelido"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
						<input
							className="field"
							type="text"
							placeholder="Room Id"
							onChange={(e) => {
								setRoom(e.target.value);
							}}
						/>
						<button className="button" onClick={joinRoom}>
							Join a Room
						</button>
					</div>
				</div>
			) : (
				""
			)}

			{showChat ? (
				<div className="chat-wrapper">
					<button onClick={leaveRoom} className="leave-button">
						leave
					</button>
					<Chat socket={socket} username={username} room={room} />
				</div>
			) : (
				""
			)}
		</>
	);
}

export default App;
