import { useEffect, useState } from "react";
import userIcon from "../../assets/person-circle.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { UserInfoLoader } from "../loaders/userInfoLoader";
import userJson from "../../fakeData/users.json"
import publicationJson from "../../fakeData/publications.json"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {searchUserPublications} from "../../store/slices/filterSearch/FilterThunks"

export const UserCard = () => {
	const [user, setUSer] = useState("");
	const [name, setName] = useState("");
    const navigate = useNavigate()
	const loader = () => {
		return (
			<>
				<UserInfoLoader />
			</>
		);
	};

	const [info, setInfo] = useState(loader());
    const pathId = location.pathname.split('/')[2]
    const userId = useSelector((state) => state.search.userId)
    const dispatch = useDispatch()
    
    //console.log(userId)
	useEffect(() => {
		try {
            setUSer(userJson.filter((u)=>u.uid === pathId)[0].displayName.split('/')[1])
            setName(userJson.filter((u)=>u.uid === pathId)[0].displayName.split('/')[0])

        } catch (error) {
            navigate("/Error404")
        }

	}, []);

	useEffect(() => {
		if (user != "") {
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
            h-auto w-[260px] rounded-2xl
            font-inter text-primary-dark
            p-3 flex flex-col place-items-center"
			>
				{info}
			</div>
		</>
	);
};
