import userIcon from "../../assets/person-circle.svg";
import { auth } from "../../firebase/config";

export const UserCard = () => {
	console.log(auth.currentUser);
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
				<h1 className="font-semibold text-[32px] text-center">{auth.currentUser.displayName.split('/')[0]}</h1>
				<h2 className="text-[14px]">{`@${auth.currentUser.displayName.split('/')[1]}`}</h2>
			</div>
		</>
	);
};
