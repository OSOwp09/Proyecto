import { lazy, Suspense } from "react";

import { Navbar } from "../../components/shared/navbar";
import { Home } from "../home/home";

//import  OpenPublication  from "../../components/index/openPublication";
const OpenPublication = lazy(() =>
	import("../../components/index/openPublication")
);

//import  User from "../mainUser/user";
const User = lazy(() => import("../mainUser/user"));

//import  UploadPhoto  from "../../components/userPage/uploadPhoto";
const UploadPhoto = lazy(() => import("../../components/userPage/uploadPhoto"));

import { ImageProvider } from "../../context/imageSelected/imageSelectedProvider";

//import  Error  from "../ErrorPage/error";
const Error = lazy(() => import("../ErrorPage/error"));

//import  OtherUsersPage  from "../otherUsers/otherUsersPage";
const OtherUsersPage = lazy(() => import("../otherUsers/otherUsersPage"));

const ChatPage = lazy(() => import("../chatPage/chatPage"));

const SearchPage = lazy(() => import("../searchPage/searchPage"));

import { useEffect, useState, createRef } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
//import { auth } from "../../firebase/config";
//import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

//import  FinishCreationOfUser from "../../components/googleUser/finishCreationOfUser";
const FinishCreationOfUser = lazy(() =>
	import("../../components/googleUser/finishCreationOfUser")
);

import { FindUserByEmail } from "../../api/Api";
import { loadUser } from "../../store/slices/auth/AuthThunks";

import { useRefDimensions } from "../../customHooks/useRefDimensions";

export default function Index() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const divRef = createRef();
	const dimensions = useRefDimensions(divRef);

	useEffect(() => {
		if (
			dimensions.width >= 640 &&
			window.location.pathname.split("/").includes("chat")
		) {
			navigate("/home");
		}
	}, [dimensions]);

	const [loadIndex, setLoadIndex] = useState(true);
	const authinfo = useSelector((state) => state.auth);
	const ChatsSlice = useSelector((state) => state.ChatsSlice);

	const handdleContinue = () => {
		dispatch(loadUser(authinfo.email));
		setLoadIndex(true);
		return;
	};

	const loadPage = async () => {
		if (authinfo.email) {
			try {
				await FindUserByEmail.get("", {
					params: {
						email: authinfo.email,
					},
				});
				setLoadIndex(true);
				return;
			} catch (error) {
				setLoadIndex(false);
				return;
			}
		}
		setLoadIndex(true);
	};

	useEffect(() => {
		loadPage();
	}, [authinfo]);

	return (
		<>
			{loadIndex ? (
				<>
					<div
						ref={divRef}
						id="page-container"
						className="relative overflow-hidden w-screen h-screen"
					>
						<div
							id="Navbar-container"
							className="hidden sm:block sticky top-0 z-50"
						>
							<Navbar />
						</div>

						<div
							id="underNavbar-container"
							className="h-[calc(100vh-48px)] w-screen flex  relative sm:z-0 z-50"
						>
							<ImageProvider>
								<Routes>
									<Route path="/" element={<Home />} />

									<Route
										path="/publication/:id"
										element={
											<Suspense>
												<OpenPublication />
											</Suspense>
										}
									/>

									<Route
										path="/:id"
										element={
											<Suspense>
												<OtherUsersPage />
											</Suspense>
										}
									/>

									{authinfo.email ? (
										<Route
											path="/user"
											element={
												<Suspense>
													<User />
												</Suspense>
											}
										/>
									) : (
										""
									)}

									{authinfo.email ? (
										<Route
											path="/upload"
											element={
												<Suspense>
													<UploadPhoto />
												</Suspense>
											}
										/>
									) : (
										""
									)}

									{authinfo.email ? (
										<Route
											path="/chat"
											element={
												<Suspense>
													<ChatPage />
												</Suspense>
											}
										/>
									) : (
										""
									)}

									<Route
										path="/search"
										element={
											<Suspense>
												<SearchPage />
											</Suspense>
										}
									/>

									<Route
										path="*"
										element={
											<Suspense>
												<Error />
											</Suspense>
										}
									/>
								</Routes>
							</ImageProvider>
						</div>

						<div
							id="Navbar-container"
							className="sm:hidden absolute bottom-0 z-0"
						>
							<Navbar />
						</div>

						<div
							className={`${
								ChatsSlice.isChatOpen ? "sm:block" : "hidden"
							} hidden absolute top-[54px] right-[360px]`}
						>
							<ChatPage />
						</div>
					</div>
				</>
			) : (
				<>
					<Suspense>
						<FinishCreationOfUser
							handdleContinue={handdleContinue}
							email={authinfo.email}
						/>
					</Suspense>
				</>
			)}
		</>
	);
}
