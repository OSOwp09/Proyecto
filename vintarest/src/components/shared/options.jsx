import { useDispatch } from "react-redux";
import { auth } from "../../firebase/config";
import { logoutAuth } from "../../store/slices/auth/AuthThunks";
import { useNavigate } from "react-router-dom";
import userLogo from "../../assets/person-circle.svg";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const OptionsCard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		onAuthStateChanged(auth, () => {
			if (auth.currentUser) {
				setName(auth.currentUser.displayName.split("/")[0]);
				setUser(auth.currentUser.displayName.split("/")[1]);
				setEmail(auth.currentUser.email);
			}
		});
	}, [auth]);

	const handdleLogout = async () => {
		try {
			dispatch(logoutAuth());
			navigate("/login");
		} catch (error) {
			console.log(error.message);
		}
	};

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
					className="flex place-items-center gap-1
                ml-3"
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
					className="flex place-items-center mt-2
                    ml-2 mr-2 px-2 py-[2px]
                    rounded-2xl
                    text-secondary-dark
                    hover:text-primary-dark
                    hover:bg-secondary-highlight
                    select-none"
				>
					<button className="text-sm">Log out</button>
				</div>
			</div>
		</>
	);
};
