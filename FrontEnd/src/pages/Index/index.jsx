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

import { ImageProvider } from "../../context/imageSelectedProvider";

//import  Error  from "../ErrorPage/error";
const Error = lazy(() => import("../ErrorPage/error"));

//import  OtherUsersPage  from "../otherUsers/otherUsersPage";
const OtherUsersPage = lazy(() => import("../otherUsers/otherUsersPage"));

import { ChatContext } from "../../context/chatContext";

import { useContext, useEffect, useState } from "react";

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

export default function Index() {
	const dispatch = useDispatch();
	const { chatState } = useContext(ChatContext);
	const [loadIndex, setLoadIndex] = useState(true);
	const authinfo = useSelector((state) => state.auth);

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
						id="page-container"
						className="relative overflow-hidden w-screen h-screen"
					>
						<div
							id="Navbar-container"
							className="sticky top-0 drop-shadow-md z-50"
						>
							<Navbar />
						</div>
						<div
							id="underNavbar-container"
							className="h-[calc(100vh-48px)] w-screen flex  relative z-0"
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
						<div className="absolute top-[54px] right-2">{chatState.code}</div>
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
