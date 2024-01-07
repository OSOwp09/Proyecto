import { lazy, Suspense } from "react";

import { Navbar } from "../../components/shared/navbar";
import { Home } from "../home/home";

import { MobileShareButton } from "../../components/shared/publicationOptions";
import { MobileThreeDots } from "../../components/shared/publicationOptions";
import { MobileCommentList } from "../../components/shared/publicationOptions";
import { OptionsCard } from "../../components/shared/options";

import { UpdateDataBase } from "../../api/Api";

const OpenPublication = lazy(() =>
	import("../../components/index/openPublication")
);

const User = lazy(() => import("../mainUser/user"));

const UploadPhoto = lazy(() => import("../../components/userPage/uploadPhoto"));

import { ImageProvider } from "../../context/imageSelected/imageSelectedProvider";

const Error = lazy(() => import("../ErrorPage/error"));

const OtherUsersPage = lazy(() => import("../otherUsers/otherUsersPage"));

const ChatPage = lazy(() => import("../chatPage/chatPage"));

const SearchPage = lazy(() => import("../searchPage/searchPage"));

import { useEffect, useState, createRef } from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const FinishCreationOfUser = lazy(() =>
	import("../../components/googleUser/finishCreationOfUser")
);

import { FindUserByEmail } from "../../api/Api";
import { loadUser } from "../../store/slices/auth/AuthThunks";

export default function Index() {
	const dispatch = useDispatch();

	const [loadIndex, setLoadIndex] = useState(true);
	const authinfo = useSelector((state) => state.auth);

	const handdleContinue = () => {
		dispatch(loadUser(authinfo.email));
		setLoadIndex(true);
		return;
	};

	const updateDataBase = async () => {
		try {
			await UpdateDataBase.get();
		} catch (error) {}
	};
	const location = useLocation();
	useEffect(() => {
		updateDataBase();
	}, [location]);

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

	//Mobile
	const navbarOptions = useSelector((state) => state.navbarOptions);
	const shareOptions = useSelector((state) => state.shareOptions);
	const publicationsOptions = useSelector((state) => state.publicationsOptions);
	const commentsList = useSelector((state) => state.commentsList);
	const ChatsSlice = useSelector((state) => state.ChatsSlice);

	return (
		<>
			{loadIndex ? (
				<>
					<div
						id="page-container"
						className="relative overflow-hidden w-screen h-full sm:h-screen"
					>
						<div
							id="Navbar-container"
							className="hidden sm:block sticky top-0 z-50"
						>
							<Navbar />
						</div>

						<div
							id="underNavbar-container"
							className="h-[calc(100%-48px)] sm:full w-screen flex relative z-0 overflow-hidden"
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

									{window.innerWidth < 640 && (
										<Route
											path="/search"
											element={
												<Suspense>
													<SearchPage />
												</Suspense>
											}
										/>
									)}

									<Route
										path="*"
										element={
											<Suspense>
												<Error />
											</Suspense>
										}
									/>

									{authinfo.email && (
										<>
											<Route
												path="/user"
												element={
													<Suspense>
														<User />
													</Suspense>
												}
											/>

											<Route
												path="/upload"
												element={
													<Suspense>
														<UploadPhoto />
													</Suspense>
												}
											/>

											{window.innerWidth < 640 && (
												<Route
													path="/chat"
													element={
														<Suspense>
															<ChatPage />
														</Suspense>
													}
												/>
											)}
										</>
									)}
								</Routes>
							</ImageProvider>
						</div>

						<div
							className={`${
								ChatsSlice.isChatOpen ? "sm:block" : "hidden"
							} hidden absolute top-[54px] right-[12px]`}
						>
							<ChatPage />
						</div>

						<div
							className={`absolute bottom-0 z-50 ${
								navbarOptions.code != "" ? "block" : "hidden"
							}`}
						>
							<OptionsCard />
						</div>
						<div
							className={`absolute bottom-0 z-50 ${
								shareOptions.code != "" ? "block" : "hidden"
							}`}
						>
							<MobileShareButton />
						</div>
						<div
							className={`absolute bottom-0 z-50 ${
								publicationsOptions.code != "" ? "block" : "hidden"
							}`}
						>
							<MobileThreeDots />
						</div>

						<div
							className={`absolute bottom-0 z-50 ${
								commentsList.code != "" ? "block" : "hidden"
							}`}
						>
							<MobileCommentList />
						</div>

						<div id="Navbar-container-mobile" className="sm:hidden z-50 ">
							<Navbar />
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
