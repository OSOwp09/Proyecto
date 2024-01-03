import usersJson from "../../fakeData/users.json";
//import publicationsJson from "../../fakeData/publications.json";

import usericon from "../../assets/person-circle.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserPublications, searchPublications } from "../../store/slices/filterSearch/FilterThunks";
import { ListUsersByHashtag } from "../../api/Api";

import { useNavigate } from "react-router-dom";

export default function UserLayout  () {
	const searchParams = new URLSearchParams(location.search).get("q");

	const [searchFilter, setsearchFilter] = useState([]);
	const [html, setHtml] = useState(<></>);
	const dispatch = useDispatch();
    const navigate = useNavigate()

	const handdleUserClick = (id) => {

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
			handdleFindUsersByHashtags()
		} else {
			setsearchFilter(usersJson.filter((p) => p.hashtags.includes("")));
		}
	}, [,searchParams]);

	useEffect(() => {
		const users = [...Array(searchFilter.length)].map(
			(x, i) => {
				var image1 = <></>;
				try {
					image1 = (
						<img
							src={searchFilter[i].publicaciones[0].photoURL}
							alt=""
							className="w-[30%]  flex-1 object-cover"
						/>
					);
				} catch (error) {}

				var image2 = <></>;
				try {
					image2 = (
						<img
							src={searchFilter[i].publicaciones[1].photoURL}
							alt=""
							className="w-[30%] flex-1 object-cover"
						/>
					);
				} catch (error) {}

				var image3 = <></>;
				try {
					image3 = (
						<img
							src={searchFilter[i].publicaciones[2].photoURL}
							alt=""
							className="w-[30%] marker:flex-1 object-cover"
						/>
					);
				} catch (error) {}

				return (
					
						<div
							key={i}
							onClick={() => handdleUserClick(searchFilter[i].user)}
							id="userContainer"
							className="bg-secondary-light w-[100%] sm:w-fit h-[50vw] sm:h-fit
                            rounded-2xl p-3
                            flex flex-col place-items-center gap-3
                            hover:shadow-[0px_0px_20px_-9px_rgba(0,0,0,0.25)]"
						>
							<div
								id="images"
								className="bg-secondary-highlight 
								h-full w-full 
								sm:h-[152px] sm:w-[384px]
								rounded-2xl
								flex 
								overflow-hidden"
							>
								{image1}
								{image2}
								{image3}
							</div>
							<div id="user-info" className="flex gap-3 place-items-center">
								<img src={usericon} alt="" className="h-[6vw] sm:h-[42px]" />
								<h1 className="font-semibold text-[5vw] sm:text-2xl">
									{searchFilter[i].user}
								</h1>
							</div>
						</div>
					
				);
			}
		);

		setHtml(users);
	}, [searchFilter]);

	return (
		<>
			<div className="sm:h-fit w-screen flex gap-3 flex-wrap justify-center px-3">
				{html}
			</div>
		</>
	);
};
