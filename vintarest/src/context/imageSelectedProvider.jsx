import { useState } from "react";
import { ImageContext } from "./imageSelectedContext";
import { ImageSelected } from "../components/shared/imageSelected";

export const ImageProvider = ({ children }) => {
	const [image, setImage] = useState({
		src: "",
		code: <></>,
	});

	const handleImageSelected = (img) => {
        
		setImage({
			...image,
			code: (
				<>
					<div id="imageSelected-container" className="px-2">
						<ImageSelected close={closeSelectedImage}/>
					</div>
				</>
			),
            src: img
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
