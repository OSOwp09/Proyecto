import { ImageCard } from "./imagecard";
import publicationsJson from "../../fakeData/publications.json";
import userJson from "../../fakeData/users.json";
import { useSelector } from "react-redux";
import { memo, useEffect, useMemo, useRef, useState, createRef } from "react";
import { useRefDimensions } from "../../customHooks/useRefDimensions";
import { LayoutLoader } from "../../components/loaders/layoutLoader";

export const ImageLayout = memo(
	({ selectImg, words = "", uid = "", pid = "-" }) => {
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
					});
					searchFilter = searchFilter.filter((p) => p.publicationid != pid);
					setsearchFilter(searchFilter);
				}

				if (searchByUseridOrHashtag == "userid") {
					setsearchFilter(publicationsJson.filter((p) => p.userid == uid));
				}
			} else {
				setsearchFilter(
					publicationsJson.filter((p) => p.hashtags.includes(""))
				);
			}
		}, [searchByWordsOrUid, searchByUseridOrHashtag]);

		/* ----- Render the list of images from left to right ---------------------------
		-------- depending of the number of columns that depends ------------------------
		-------- on the width of the container of the layout ----------------------------
		*/

		const [imgs, setImgs] = useState([]);
		const divRef = createRef();
		const dimensions = useRefDimensions(divRef); //Width of the divRef elemnt
		const [width, setWidth] = useState(0); //Width saved of the divRef elemnt to do the calculations of columns
		const treshholdWidth = 248;
		const numOfColumns =
			width / treshholdWidth - ((width / treshholdWidth) % 1);
		const [html, setHtml] = useState(<></>);


		useEffect(() => {
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
			setImgs(images);
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

		return (
			<>
				<div
					ref={divRef}
					id="images-container"
					className="w-full flex place-content-center gap-2"
				>
					{html}
				</div>	
			</>
		);
	}
);
