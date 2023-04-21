import { ImageCard } from "./imagecard";
import publicationsJson from "../../fakeData/publications.json";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ImageLayout = ({ selectImg }) => {
	
	const searchParams = useSelector((state) => state.search).words.toLowerCase();
	const searchParamsArry = searchParams.split(" ");
	const [searchFilter, setsearchFilter] = useState([]);
	const [html, setHtml] = useState(<></>);

	useEffect(() => {
		if (searchParams != "") {
			searchParamsArry.map((hashtag = searchParamsArry, i) => {
				if (i == 0) {
					setsearchFilter(
						publicationsJson.filter((p) =>
							p.hashtags.includes(searchParamsArry[0])
						)
					);
					return;
				}
				setsearchFilter(
					_.union(
						publicationsJson.filter((p) =>
							p.hashtags.includes(searchParamsArry[i])
						),
						searchFilter
					)
				);
			});
		} else {
			setsearchFilter(publicationsJson.filter((p) => p.hashtags.includes("")));
		}
	}, [,useSelector((state) => state.search).words]);

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
