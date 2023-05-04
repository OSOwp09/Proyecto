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
	const handleImageSelected = async (img, title, id) => {
		const p1 = new Promise((resolve, reject) => {
			setImage({ ...image, code: <></> });
			resolve("Success!");
		});

		p1.then(() => {
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
