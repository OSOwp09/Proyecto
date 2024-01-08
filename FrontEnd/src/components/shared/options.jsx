import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { logoutAuth } from "../../store/slices/auth/AuthThunks";
import { useNavigate } from "react-router-dom";
import userLogo from "../../assets/person-circle.svg";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { closeOptions } from "../../store/slices/navbarOptions/navbarOptionsThunks";

export const OptionsCard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userInfo = useSelector((state) => state.auth);
	const [name, setName] = useState("");
	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		setName(userInfo.name);
		setUser(userInfo.user);
		setEmail(userInfo.email);
	}, [, userInfo]);

	const handdleLogout = async () => {
		try {
			dispatch(logoutAuth());
			navigate("/login");
		} catch (error) {
			console.log(error.message);
		}
	};

	//Desktop
	const desktopOptions = () => {
		return (
			<>
				<div
					id="card"
					className="bg-secondary-light
					h-auto w-[304px] rounded-2xl
					font-inter text-primary-dark
					py-2"
				>
					<div
						id="image-and-userinfo"
						className="flex place-items-center gap-1 ml-3"
					>
						<img src={userLogo} alt="" className="h-12" />
						<div>
							<h1 id="Name" className="text-base font-semibold">
								{name}
							</h1>
							<p id="User" className="text-xs">
								@{user}
							</p>
							<p id="email" className="text-xs">
								{email}
							</p>
						</div>
					</div>
					<div
						onClick={() => handdleLogout()}
						className="
						group
						flex place-items-center mt-2
						ml-2 mr-2 px-2 py-[2px]
						rounded-2xl
						text-primary-dark
						hover:text-secondary-light
						hover:bg-secondary-red
						select-none"
					>
						<button className="text-sm">Log out</button>
					</div>
				</div>
			</>
		);
	};

	//mobile
	const mobileOptions = () => {
		return (
			<>
				<div className="h-full w-screen">
					<div
						onClick={() => dispatch(closeOptions())}
						id="darkOverlay"
						className="absolute top-0 left-0 bg-primary-dark/60 h-full w-full backdrop-blur-sm"
					></div>

					<div className="absolute bottom-0 w-screen h-auto bg-secondary-light rounded-t-2xl flex flex-col place-items-center py-4 z-50">
						<div
							onClick={() => {
								handdleLogout(), dispatch(closeOptions());
							}}
							className={`${
								name != null ? "block" : "hidden"
							} w-screen flex flex-col place-content-center px-[22px] mb-4`}
						>
							<button className="text-sm text-secondary-light bg-primary-red py-2 rounded-full font-semibold font-inter">
								Log out
							</button>
						</div>
						<div
							onClick={() => {
								navigate("/login"), dispatch(closeOptions());
							}}
							className={`${
								name == null ? "block" : "hidden"
							} w-screen flex flex-col place-content-center px-[22px] mb-4`}
						>
							<button className="text-sm text-secondary-light bg-primary-highlight py-2 rounded-full font-semibold font-inter">
								Log in
							</button>
						</div>
						<div onClick={() => dispatch(closeOptions())}>
							<button className="font-semibold font-inter text-primary-dark  bg-secondary-light rounded-2xl py-3 px-4 drop-shadow-md">
								Close
							</button>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="block sm:hidden">{mobileOptions()}</div>
			<div className="hidden sm:block">{desktopOptions()}</div>
		</>
	);
};
