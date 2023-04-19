import { Navbar } from "../../components/shared/navbar";
import { Home } from "../home/home";
import { OpenPublication } from "../../components/index/openPublication";
import { User } from "../User/user";
import { UploadPhoto } from "../../components/userPage/uploadPhoto";
import { ImageProvider } from "../../context/imageSelectedProvider";
import { Error } from "../ErrorPage/error";

import { ChatContext } from "../../context/chatContext";
import { useContext } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";

export const Index = () => {
	const navigate = useNavigate();
	const { chatState } = useContext(ChatContext);

	return (
		<>
			<div
				id="page-container"
				className="relative overflow-hidden w-screen h-screen"
			>
				<div id="Navbar-container" className="sticky top-0 drop-shadow-md z-50">
					<Navbar />
				</div>
				<div
					id="underNavbar-container"
					className="h-[calc(100vh-80px)] w-screen flex  relative "
				>
					<ImageProvider>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/publication/:id" element={<OpenPublication />} />
							{auth.currentUser ? (
								<Route path="/user" element={<User />} />
							) : (
								""
							)}
							{auth.currentUser ? (
								<Route path="/upload" element={<UploadPhoto />} />
							) : (
								""
							)}
							<Route path="*" element={<Error />} />
						</Routes>
					</ImageProvider>
				</div>
				<div className="absolute top-[84px] right-2">{chatState.code}</div>
			</div>
		</>
	);
};
