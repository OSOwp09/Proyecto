import { useEffect, useState } from "react";
import userIcon from "../../assets/person-circle.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { UserInfoLoader } from "../loaders/userInfoLoader";
import { useSelector } from "react-redux";

export const UserCard = () => {
	const [user, setUSer] = useState("");
	const [name, setName] = useState("");

	const loader = () => {
		return (
			<>
				<UserInfoLoader />
			</>
		);
	};
	const [info, setInfo] = useState(loader());

	const userinfo = useSelector((state) => state.auth);

	useEffect(() => {
		onAuthStateChanged(auth, () => {
			setName(userinfo.name);
			setUSer(userinfo.user);
		});
	}, [,userinfo]);

	useEffect(() => {
		if (user != "" && user != undefined) {
			setInfo(
				<>
					<img src={userIcon} alt="" className="h-[120px] mb-2 select-none" />
					<h1 className="font-semibold text-[32px] text-center">{name}</h1>
					<h2 className="text-[14px]">{`@${user}`}</h2>
				</>
			);
		}
	}, [user]);

	return (
		<>
			<div
				className="
            bg-secondary-light
            h-auto w-auto min-w-[260px] rounded-2xl
            font-inter text-primary-dark
            p-3 flex flex-col place-items-center"
			>
				{info}
			</div>
		</>
	);
};
