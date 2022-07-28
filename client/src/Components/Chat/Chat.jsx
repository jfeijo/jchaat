import React, { useEffect } from "react";
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../../src/globals.scss";
import Logo from "../../Assets/Images/logo-horizontal.svg";

function Chat({ socket, username, room }) {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [showOnlineUsers, setShowOnlineUsers] = useState([]);

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};

			await socket.emit("send_message", messageData);
			document.getElementById("x").value = "";
			setMessageList((list) => [...list, messageData]);
		}
	};

	useEffect(() => {
		//Will listen if theres any new messages
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
			console.log(data);
		});
	}, [socket]);

	return (
		<div>
			<div>
				<img src={Logo} className="logo" alt="logo" />
			</div>
			<div className="chat-body">
				<ScrollToBottom className="message-container">
					{messageList.map((messageContent) => {
						return (
							<div
								id={
									username === messageContent.author
										? "you"
										: "other"
								}
							>
								<h3 className="message-content">
									{messageContent.message}
								</h3>
								<p className="message-info">
									{messageContent.author +
										" " +
										messageContent.time}
								</p>
								<div>
									<h4>{showOnlineUsers}</h4>
								</div>
							</div>
						);
					})}
				</ScrollToBottom>
			</div>
			<div className="input-wrapper">
				<input
					id="x"
					onChange={(e) => {
						setCurrentMessage(e.target.value);
					}}
					type="ẗext"
					className="input-chat"
					placeholder="Type something here..."
					onKeyPress={(event) =>
						event.key === "Enter" && sendMessage()
					}
				/>
				<button className="button btn-send" onClick={sendMessage}>
					Send
				</button>
			</div>
		</div>
	);
}

export default Chat;
