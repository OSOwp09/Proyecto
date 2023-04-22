import { ImageCard } from "./imagecard";
import publicationsJson from "../../fakeData/publications.json";
import userJson from "../../fakeData/users.json";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

export const ImageLayout = ({ selectImg, words = "", uid = "" }) => {
	const wordsValidator = useSelector(
		(state) => state.search
	).words.toLowerCase();

	const [searchByWordsOrUid, setSearchByWordsOrUid] = useState();
	const [searchByUseridOrHashtag, setSearchByUseridOrHashtag] = useState();
	const [searchFilter, setsearchFilter] = useState([]);
	const [html, setHtml] = useState(<></>);

	try {
		const pathId = location.pathname.split("/")[2];
		uid = userJson.filter((p) => p.uid === pathId)[0].uid;
	} catch (error) {
		useEffect(() => {
			setSearchByWordsOrUid(words);
			setSearchByUseridOrHashtag("hashtags");
		}, [wordsValidator]);
	}

	useEffect(() => {
		if (uid != "") {
			setSearchByWordsOrUid(uid);
			setSearchByUseridOrHashtag("userid");
		} else {
			setSearchByWordsOrUid(words);
			setSearchByUseridOrHashtag("hashtags");
		}
	}, []);

	useMemo(() => {
		if (searchByWordsOrUid != "") {
			if (searchByUseridOrHashtag == "hashtags") {
				var searchFilter = [];
				const searchParamsArry = searchByWordsOrUid.split(" ");
				searchParamsArry.map((hashtag = searchParamsArry, i) => {
					if (i == 0) {
						searchFilter = publicationsJson.filter((p) =>
							p.hashtags.includes(searchParamsArry[0])
						);

						setsearchFilter(searchFilter);
						return;
					}

					searchFilter = _.union(
						publicationsJson.filter((p) =>
							p.hashtags.includes(searchParamsArry[i])
						),
						searchFilter
					);
					setsearchFilter(searchFilter);
				});
			}

			if (searchByUseridOrHashtag == "userid") {
				console.log("last");
				setsearchFilter(publicationsJson.filter((p) => p.userid == uid));
			}
		} else {
			setsearchFilter(publicationsJson.filter((p) => p.hashtags.includes("")));
		}
	}, [searchByWordsOrUid, searchByUseridOrHashtag]);

	useEffect(() => {
		const images = [...Array(searchFilter.length)].map(
			(image = searchFilter, i) => (
				<ImageCard
					key={i}
					id={image[i].publicationid}
					selectImg={selectImg}
					image={image[i].photoURL}
					description={image[i].title}
					userName={image[i].userName}
				/>
			)
		);

		setHtml(
			<div
				className=" 
				columns-[14rem] 
				h-auto w-auto"
			>
				{images}
			</div>
		);
	}, [searchFilter]);

	return <>{html}</>;
};
