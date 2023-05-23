import { useState } from "react";
import { ImageContext } from "./imageSelectedContext";
import { ImageSelected } from "../components/shared/imageSelected";

export const ImageProvider = ({ children }) => {
	const [image, setImage] = useState({
		id: null,
		src: "",
		title: "",
		description:"",
		user: "",
		code: <></>,
		hashtags: ""
	});
	const handleImageSelected = (img, title,description, id, hashtags, userName) => {
		setImage({
			...image,
			code: (
				<>
					<div id="imageSelected-container" className="">
						<ImageSelected close={closeSelectedImage} />
					</div>
				</>
			),
			id: id,
			src: img,
			title: title,
			description: description,
			user: userName,
			hashtags: hashtags
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
