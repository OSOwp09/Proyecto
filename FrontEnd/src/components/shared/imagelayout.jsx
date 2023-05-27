import { ImageCard } from "./imagecard";
import publicationsJson from "../../fakeData/publications.json";
import userJson from "../../fakeData/users.json";
import { useSelector } from "react-redux";
import { memo, useEffect, useMemo, useRef, useState, createRef } from "react";
import { useRefDimensions } from "../../customHooks/useRefDimensions";
import {
	FindUserByUser,
	FindUserByEmail,
	ListPublicationsByHashtags,
} from "../../api/Api";
import { LayoutLoader } from "../../components/loaders/layoutLoader";

export const ImageLayout = memo(
	({ selectImg, words = "", uid = "", pid = "-" }) => {
		const [loaded, setLoaded] = useState(false);

		const wordsValidator = useSelector(
			(state) => state.search
		).words.toLowerCase();

		const [searchByWordsOrUid, setSearchByWordsOrUid] = useState();
		const [searchByUseridOrHashtag, setSearchByUseridOrHashtag] = useState();
		const [searchFilter, setsearchFilter] = useState([]);

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
		}, [, words]);

		const handdleFindUser = async (user) => {
			try {
				const respUser = await FindUserByUser.get("", {
					params: {
						user: user,
					},
				});
				setsearchFilter(respUser.data.usuario);
			} catch (error) {}

			try {
				const respUser = await FindUserByEmail.get("", {
					params: {
						email: user,
					},
				});
				setsearchFilter(respUser.data.usuario);
			} catch (error) {}
		};

		const handdleListPublicationsByHashtags = async () => {
			//console.log("object");
			try {
				const resp = await ListPublicationsByHashtags.get("", {
					params: {
						hashtags: words,
						publicationId: pid,
					},
				});

				const publicationsList = resp.data;
				setsearchFilter(publicationsList.publications);
			} catch (error) {}
		};

		const hanndleListAllPublications = async () => {
			try {
				const resp = await ListPublicationsByHashtags.get("", {
					params: {
						hashtags: " ",
					},
				});

				const publicationsList = resp.data;
				setsearchFilter(
					publicationsList.publications.filter((p) => p.id != pid)
				);
			} catch (error) {}
		};

		useMemo(() => {
			if (searchByWordsOrUid != "") {
				if (searchByUseridOrHashtag == "hashtags") {
					// var searchFilter = [];

					// const searchParamsArry = searchByWordsOrUid.split(" ");
					// searchParamsArry.map((hashtag = searchParamsArry, i) => {
					// 	if (i == 0) {
					// 		searchFilter = publicationsJson.filter((p) =>
					// 			p.hashtags.includes(searchParamsArry[0])
					// 		);

					// 		setsearchFilter(searchFilter);
					// 		return;
					// 	}

					// 	searchFilter = _.union(
					// 		publicationsJson.filter((p) =>
					// 			p.hashtags.includes(searchParamsArry[i])
					// 		),
					// 		searchFilter
					// 	);
					// });

					// searchFilter = searchFilter.filter((p) => p.publicationid != pid);
					// setsearchFilter(searchFilter);
					handdleListPublicationsByHashtags();
					return;
				}

				if (searchByUseridOrHashtag == "userid") {
					//setsearchFilter(publicationsJson.filter((p) => p.userid == uid));
					handdleFindUser(uid);
					return;
				}
			} else {
				// setsearchFilter(
				// 	publicationsJson.filter((p) => p.hashtags.includes(""))
				// );
				hanndleListAllPublications();
			}
		}, [searchByWordsOrUid, searchByUseridOrHashtag]);

		/* ----- Render the list of images from left to right ---------------------------
		-------- depending of the number of columns that depends ------------------------
		-------- on the width of the container of the layout ----------------------------
		*/
		const hanndleResize = (element) => {
		
			// element.target.style.height = "38px";
			// element.target.style.height = element.target.scrollHeight + "px";
		};

		const [imgs, setImgs] = useState([]);
		const divRef = createRef();
		const [width, setWidth] = useState(0); //Width saved of the divRef elemnt to do the calculations of columns
		const dimensions = useRefDimensions(divRef); //Width of the divRef elemnt
		const treshholdWidth = 248;
		const numOfColumns =
			width / treshholdWidth - ((width / treshholdWidth) % 1);
		const [html, setHtml] = useState(<></>);

		useMemo(() => {
			/* widths in terms of the treshholdWidth, 
			meaning how many columns it can have depending of
			the treshholdWidth
			*/
			const saveWidth = width / treshholdWidth - ((width / treshholdWidth) % 1);
			const elementWidth =
				dimensions.width / treshholdWidth -
				((dimensions.width / treshholdWidth) % 1);

			/* checking if the width of the container element has changed in terms of the
			`treshholdWidth` value. 
			If it has changed, it updates the `width` state with the new width value.
			This is important for the layout of the images, as it determines how many columns the images
			should be divided into. */
			if (saveWidth != elementWidth) {
				setWidth(dimensions.width);
			}
		}, [dimensions]);

		/* This `useEffect` hook is creating an array of `ImageCard` components based on the `searchFilter`
		state.
		It maps over the `searchFilter` array and creates an `ImageCard` component for each item in
		the array. 
		The props are set based on the properties of the item in the array.
		The resulting array of `ImageCard` components is then stored in the `imgs` state using 
		the `setImgs` function. This effect will re-run whenever the `searchFilter` state changes. */
		useEffect(() => {
			if (searchByWordsOrUid != "") {
				if (searchByUseridOrHashtag == "hashtags") {
					// const images = [...Array(searchFilter.length)].map(
					// 	(image = searchFilter, i) => (
					// 		<ImageCard
					// 			key={i}
					// 			id={image[i].publicationid}
					// 			selectImg={selectImg}
					// 			image={image[i].photoURL}
					// 			description={image[i].title}
					// 			userName={image[i].userName}
					// 			hashtags={image[i].hashtags}
					// 		/>
					// 	)
					// );
					const images = [...Array(searchFilter.length)].map(
						(image = searchFilter, i) => (
							<ImageCard
								key={i}
								id={image[i]._id}
								selectImg={selectImg}
								image={image[i].photoURL}
								title={image[i].title}
								description={image[i].description}
								userName={image.user}
								hashtags={image[i].hashtags}
							/>
						)
					);

					setImgs(images);
				}
				if (searchByUseridOrHashtag == "userid") {
					const images = [...Array(searchFilter.publications.length)].map(
						(image = searchFilter, i) => (
							<ImageCard
								key={i}
								id={image.publications[i]._id}
								selectImg={selectImg}
								image={image.publications[i].photoURL}
								title={image.publications[i].title}
								description={image.publications[i].description}
								userName={image.user}
								hashtags={image.publications[i].hashtags}
							/>
						)
					);

					setImgs(images);
				}
			} else {
				// const images = [...Array(searchFilter.length)].map(
				// 	(image = searchFilter, i) => (
				// 		<ImageCard
				// 			key={i}
				// 			id={image[i].publicationid}
				// 			selectImg={selectImg}
				// 			image={image[i].photoURL}
				// 			description={image[i].title}
				// 			userName={image[i].userName}
				// 			hashtags={image[i].hashtags}
				// 		/>
				// 	)
				// );

				const images = [...Array(searchFilter.length)].map(
					(image = searchFilter, i) => (
						<ImageCard
							key={i}
							id={image[i]._id}
							selectImg={selectImg}
							image={image[i].photoURL}
							title={image[i].title}
							description={image[i].description}
							userName={image[i].userId.user}
							hashtags={image[i].hashtags}
						/>
					)
				);

				setImgs(images);
			}
		}, [searchFilter]);

		/**
		 * The function `handdleReorder` returns a layout of images re-arranged in a matrix with
		 * `numOfColumns` columns.
		 * The images are taken from the `imgs` array and arranged in the matrix from left to rigth
		 * using nested loops.
		 * The resulting matrix is then used to create a layout of `div` elements, each
		 * containing a column of images. The layout is returned as an array of `div` elements.
		 */
		const handdleReorder = () => {
			const numOfRows = imgs.length / numOfColumns;
			var matrix = [];

			for (var i = 0; i < numOfColumns; i++) {
				matrix[i] = new Array();
			}

			for (let row = 0; row < numOfRows; row++) {
				for (let column = 0; column < numOfColumns; column++) {
					const index = column + row + (numOfColumns - 1) * row;
					matrix[column][row] = imgs[index];
				}
			}

			const layout = [...Array(numOfColumns)].map((x, i) => (
				<div key={i} className="h-fit">
					{matrix[i]}
				</div>
			));
			if (imgs[0] != undefined) {
				setLoaded(true);
			}
			return layout;
		};

		/* This `useEffect` hook is checking if the division of the length of the `imgs` array by the
		`numOfColumns` variable is not equal to `Infinity` or `NaN`. If it is not, it calls the
		`handdleReorder` function to re-arrange the images in a matrix with `numOfColumns` columns and
		sets the resulting layout as the `html` state using the `setHtml` function. This effect will
		re-run whenever the `width` or `imgs` state changes. */
		useEffect(() => {
			const checkForInfinityOrNaN = imgs.length / numOfColumns;
			if (checkForInfinityOrNaN != Infinity && checkForInfinityOrNaN != NaN) {
				setHtml(handdleReorder());
			}
		}, [width, imgs]);

		/*--------------------------------------------------------------------------------------------------------------*/

		const loader = () => {
			return (
				<>
					<div className="absolute top-[-8px] left-0 z-50 ">
						<LayoutLoader />
					</div>
				</>
			);
		};

		const [loaderGone, setLoaderGone] = useState(false)
		const hideLoader = async() =>{
			setTimeout(() => {
				setLoaderGone(true)
			}, 1400);
		}
		useEffect(()=>{	
			if(loaded){
				hideLoader()
			}
		},[loaded])

		// useEffect(()=>{
		// 	console.log("");
		// })

		return (
			<>
				<div
					ref={divRef}
					id="images-container"
					className="relative w-full overflow-x-hidden"
				>
					<input
						type="checkbox"
						className="invisible absolute top-0 left-0 peer w-6 h-6 z-50"
						checked={loaded}
					/>
					<div
						className={`
						overflow-hidden
						transition-all duration-[1100ms] delay-[500ms]
						opacity-100 peer-checked:opacity-0
						${loaderGone ? "hidden":"block"}`}
					>
						{loader()}
					</div>

					<div
						className={`
						flex place-content-center gap-2 
						transition-all duration-[1400ms] delay-[800ms]
						opacity-0 peer-checked:opacity-100`}
					>
						{html}
					</div>
				</div>
			</>
		);
	}
);
