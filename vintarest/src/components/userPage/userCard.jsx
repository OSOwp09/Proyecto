import { useEffect, useState } from "react";
import userIcon from "../../assets/person-circle.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

export const UserCard = () => {
	const [user, setUSer] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		onAuthStateChanged(auth, () => {
			setName(auth.currentUser.displayName.split("/")[0]);
			setUSer(auth.currentUser.displayName.split("/")[1]);
		});
	}, []);
	return (
		<>
			<div
				className="
            bg-secondary-light
            h-auto w-[260px] rounded-2xl
            font-inter text-primary-dark
            p-3 flex flex-col place-items-center"
			>
				<img src={userIcon} alt="" className="h-[120px] mb-2 select-none" />
				<h1 className="font-semibold text-[32px] text-center">{name}</h1>
				<h2 className="text-[14px]">{`@${user}`}</h2>
			</div>
		</>
	);
};
