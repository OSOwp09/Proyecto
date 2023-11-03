import { lazy, Suspense } from "react";

import { useState } from "react";
import { ImageContext } from "./imageSelectedContext";

//import  ImageSelected  from "../components/shared/imageSelected";
const ImageSelected = lazy(() => import("../components/shared/imageSelected"));

export const ImageProvider = ({ children }) => {
	const [image, setImage] = useState({
		id: null,
		src: "",
		title: "",
		description: "",
		user: "",
		code: <></>,
		hashtags: "",
	});
	const handleImageSelected = (
		img,
		title,
		description,
		id,
		hashtags,
		userName
	) => {
		setImage({
			...image,
			code: (
				<>
					<div id="imageSelected-container" className="">
						<Suspense>
							<ImageSelected close={closeSelectedImage} />
						</Suspense>
					</div>
				</>
			),
			id: id,
			src: img,
			title: title,
			description: description,
			user: userName,
			hashtags: hashtags,
		});
	};

	const closeSelectedImage = () => {
		setImage({ ...image, code: <></> });
	};

	return (
		<ImageContext.Provider
			value={{ image, setImage, handleImageSelected, closeSelectedImage }}
		>
			{children}
		</ImageContext.Provider>
	);
};
