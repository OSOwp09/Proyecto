import { useState } from "react";
import { ImageContext } from "./imageSelectedContext";
import { ImageSelected } from "../components/shared/imageSelected";

export const ImageProvider = ({ children }) => {
	const [image, setImage] = useState({
		id: null,
		src: "",
		title: "",
		code: <></>,
	});
	const handleImageSelected = (img, title, id) => {
		setImage({
			...image,
			code: (
				<>
					<div id="imageSelected-container" className="px-">
						<ImageSelected close={closeSelectedImage} />
					</div>
				</>
			),
			id: id,
			src: img,
			title: title,
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
