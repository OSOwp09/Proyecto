import usersJson from "../../fakeData/users.json";
//import publicationsJson from "../../fakeData/publications.json";

import usericon from "../../assets/person-circle.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserPublications, searchPublications } from "../../store/slices/filterSearch/FilterThunks";
import { ListUsersByHashtag } from "../../api/Api";

import { useNavigate } from "react-router-dom";

export default function UserLayout  () {
	const searchParams = useSelector((state) => state.search).words.toLowerCase();
	const searchParamsArry = searchParams.split(" ");
	const [searchFilter, setsearchFilter] = useState([]);
	const [html, setHtml] = useState(<></>);
	const dispatch = useDispatch();
    const navigate = useNavigate()

	const handdleUserClick = (id) => {
		// try {
		// 	publicationsJson.filter((p) => p.userid == users[i].uid);
		// } catch (error) {}

        dispatch(searchUserPublications(id))
        dispatch(searchPublications(""))
        navigate(`/home/${id}`)
	};

	const handdleFindUsersByHashtags = async() =>{
		const resp = await ListUsersByHashtag("",{
			params: {
				hashtags: searchParams
			}
		})
		const users = resp.data.usuarios
		console.log(users);
		setsearchFilter(users)
	}

	useEffect(() => {
		if (searchParams != "") {
			// searchParamsArry.map((hashtag = searchParamsArry, i) => {
			// 	if (i == 0) {
			// 		setsearchFilter(
			// 			usersJson.filter((p) => p.hashtags.includes(searchParamsArry[0]))
			// 		);
			// 		return;
			// 	}
			// 	setsearchFilter(
			// 		_.union(
			// 			usersJson.filter((p) => p.hashtags.includes(searchParamsArry[i])),
			// 			searchFilter
			// 		)
			// 	);
			// });
			handdleFindUsersByHashtags()
		} else {
			setsearchFilter(usersJson.filter((p) => p.hashtags.includes("")));
		}
	}, [, useSelector((state) => state.search).words]);

	useEffect(() => {
		const users = [...Array(searchFilter.length)].map(
			(x, i) => {
				var image1 = <></>;
				try {
					image1 = (
						<img
							// src={
							// 	publicationsJson.filter((p) => p.userid == users[i].uid)[0]
							// 		.photoURL
							// }
							src={searchFilter[i].publicaciones[0].photoURL}
							alt=""
							className="flex-1 object-cover"
						/>
					);
				} catch (error) {}

				var image2 = <></>;
				try {
					image2 = (
						<img
							// src={
							// 	publicationsJson.filter((p) => p.userid == users[i].uid)[1]
							// 		.photoURL
							// }
							src={searchFilter[i].publicaciones[1].photoURL}
							alt=""
							className="flex-1 object-cover"
						/>
					);
				} catch (error) {}

				var image3 = <></>;
				try {
					image3 = (
						<img
							// src={
							// 	publicationsJson.filter((p) => p.userid == users[i].uid)[2]
							// 		.photoURL
							// }
							src={searchFilter[i].publicaciones[2].photoURL}
							alt=""
							className="flex-1 object-cover"
						/>
					);
				} catch (error) {}

				return (
					<>
						<div
							//onClick={()=>console.log(users[i].uid)}
							//onClick={() => handdleUserClick(users[i].uid)}
							onClick={() => handdleUserClick(searchFilter[i].user)}
							id="userContainer"
							className="bg-secondary-light w-fit h-fit
                            rounded-2xl p-3
                            flex flex-col place-items-center gap-3
                            hover:shadow-[0px_0px_20px_-9px_rgba(0,0,0,0.25)]"
						>
							<div
								id="images"
								className="bg-secondary-highlight h-[152px] w-[384px]
                            rounded-2xl
                            flex 
                            overflow-hidden"
							>
								{image1}
								{image2}
								{image3}
							</div>
							<div id="user-info" className="flex gap-3 place-items-center">
								<img src={usericon} alt="" className="h-[42px]" />
								<h1 className="font-semibold text-2xl">
									{/* {users[i].displayName.split('/')[1]} */}
									{searchFilter[i].user}
								</h1>
							</div>
						</div>
					</>
				);
			}
		);

		setHtml(users);
		//console.log(searchFilter);
	}, [searchFilter]);

	return (
		<>
			<div className="h-fit w-fit flex gap-3 flex-wrap place-content-center px-3">
				{html}
			</div>
		</>
	);
};
