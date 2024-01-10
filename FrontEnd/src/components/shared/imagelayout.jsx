import { lazy, Suspense } from "react";

const ImageCard = lazy(() => import("./imagecard"));

//import publicationsJson from "../../fakeData/publications.json";
import userJson from "../../fakeData/users.json";
import { useSelector } from "react-redux";
import { memo, useEffect, useMemo, useState, createRef } from "react";
import { useRefDimensions } from "../../customHooks/useRefDimensions";
import { FindUserByUser, ListPublicationsByHashtags } from "../../api/Api";
import { LayoutLoader } from "../../components/loaders/layoutLoader";

export default function ImageLayout({ words = "", uid = "", pid = "-" }) {
	const [loaded, setLoaded] = useState(false);

	const wordsValidator = useSelector(
		(state) => state.search
	).words.toLowerCase();

	const [searchByWordsOrUid, setSearchByWordsOrUid] = useState(null);
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
			if (respUser.data.usuario.publications.length == 0) {
				setLoaded(true);
			}
			setsearchFilter(respUser.data.usuario);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handdleListPublicationsByHashtags = async () => {
		try {
			const resp = await ListPublicationsByHashtags.get("", {
				params: {
					hashtags: words,
					publicationId: pid,
				},
			});
			if (resp.data.publications.length == 0) {
				setLoaded(true);
			}
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
			setsearchFilter(publicationsList.publications.filter((p) => p.id != pid));
		} catch (error) {}
	};

	useEffect(() => {
		if (searchByWordsOrUid) {
			if (searchByUseridOrHashtag == "hashtags") {
				handdleListPublicationsByHashtags();
				return;
			}

			if (searchByUseridOrHashtag == "userid") {
				handdleFindUser(uid);
				return;
			}
		} else {
			hanndleListAllPublications();
		}
	}, [searchByWordsOrUid, searchByUseridOrHashtag]);

	/* ----- Render the list of images from left to right ---------------------------
		-------- depending of the number of columns that depends ------------------------
		-------- on the width of the container of the layout ----------------------------
		*/

	const [imgs, setImgs] = useState([]);
	const divRef = createRef();
	const [width, setWidth] = useState(0); //Width saved of the divRef elemnt to do the calculations of columns
	const dimensions = useRefDimensions(divRef); //Width of the divRef elemnt

	const [treshholdWidth, setTreshholdWidth] = useState(240);
	const numOfColumns =
		window.innerWidth >= 450
			? width / treshholdWidth - ((width / treshholdWidth) % 1)
			: 2;

	const [html, setHtml] = useState(<></>);

	useEffect(() => {
		window.innerWidth >= 450 ? setTreshholdWidth(240) : setTreshholdWidth(150);
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
				const images = [...Array(searchFilter.length)].map(
					(image = searchFilter, i) => (
						<Suspense key={i}>
							<ImageCard
								id={image[i]._id}
								//selectImg={//selectImg}
								image={image[i].photoURL}
								title={image[i].title}
								description={image[i].description}
								userName={image.user}
								hashtags={image[i].hashtags}
								hexColoraverageColor={image[i].hexColoraverageColor}
								imageSize={image[i].imageSize}
							/>
						</Suspense>
					)
				);

				setImgs(images);
			}
			if (searchByUseridOrHashtag == "userid" && searchFilter.publications) {
				const images = [...Array(searchFilter.publications.length)].map(
					(image = searchFilter, i) => {
						return (
							<Suspense key={i}>
								<ImageCard
									id={image.publications[i]._id}
									image={image.publications[i].photoURL}
									title={image.publications[i].title}
									description={image.publications[i].description}
									userName={image.user}
									hashtags={image.publications[i].hashtags}
									hexColoraverageColor={
										image.publications[i].hexColoraverageColor
									}
									imageSize={image.publications[i].imageSize}
								/>
							</Suspense>
						);
					}
				);

				setImgs(images);
			}
		} else {
			const images = [...Array(searchFilter.length)].map(
				(image = searchFilter, i) => (
					<Suspense key={i}>
						<ImageCard
							id={image[i]._id}
							image={image[i].photoURL}
							title={image[i].title}
							description={image[i].description}
							userName={image[i].userId.user}
							hashtags={image[i].hashtags}
							hexColoraverageColor={image[i].hexColoraverageColor}
							imageSize={image[i].imageSize}
						/>
					</Suspense>
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
			<div key={i} className="h-auto">
				{matrix[i]}
			</div>
		));
		if (imgs[0] != undefined) {
			setLoaded(true);
		}
		setHtml(layout);
	};

	/* This `useEffect` hook is checking if the division of the length of the `imgs` array by the
		`numOfColumns` variable is not equal to `Infinity` or `NaN`. If it is not, it calls the
		`handdleReorder` function to re-arrange the images in a matrix with `numOfColumns` columns and
		sets the resulting layout as the `html` state using the `setHtml` function. This effect will
		re-run whenever the `width` or `imgs` state changes. */
	useEffect(() => {
		const checkForInfinityOrNaN = imgs.length / numOfColumns;
		if (checkForInfinityOrNaN != Infinity && checkForInfinityOrNaN != NaN) {
			handdleReorder();
		}
	}, [width, imgs]);

	/*--------------------------------------------------------------------------------------------------------------*/

	const loader = () => {
		return (
			<>
				<div className="absolute top-[-4px] h-full /bg-primary-light left-0 z-50 overflow-hidden">
					<LayoutLoader />
				</div>
			</>
		);
	};
	const [layoutLoaderHtml, setLayoutLoaderHtml] = useState(loader());

	const [loaderGone, setLoaderGone] = useState(false);
	const hideLoader = async () => {
		const time = 1400;
		setTimeout(() => {
			setLoaderGone(true);
		}, time);
		setTimeout(() => {
			setLayoutLoaderHtml(null);
		}, time + 200);
	};

	const urlParams = new URLSearchParams(location.search).get("q");
	useEffect(() => {
		if (loaded) {
			setLoaderGone(false);
			hideLoader();
		}
	}, [, loaded, urlParams]);

	useEffect(() => {
		setLoaderGone(false);
		setLayoutLoaderHtml(loader());
		setLoaded(false);
	}, [urlParams]);

	return (
		<>
			<div
				ref={divRef}
				id="images-container"
				className="relative w-full overflow-x-hidden overflow-hidden"
			>
				<div
					className={` transition-all duration-700 z-50 h-screen 
					${loaderGone ? "opacity-0 " : "opacity-100 "}
					${layoutLoaderHtml ? "block" : "hidden"}
					`}
				>
					{layoutLoaderHtml}
				</div>
				<div
					className={`
					transition-all h-full
					${loaderGone ? "opacity-100 delay-150" : "opacity-0"}
					flex place-content-center`}
				>
					{html}
				</div>
			</div>
		</>
	);
}
