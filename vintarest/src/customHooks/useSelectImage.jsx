import { ImageSelected } from "../components/shared/imageSelected";
import { useState, useEffect } from "react";

export const useSelectImage = (value) => {

	const [imgSelected, setImgSelected] = useState(value);

	const handleImageSelected = (src) => {
		setImgSelected(
			<>
				<div id="imageSelected-container" className="px-2">
					<ImageSelected close = {closeSelectedImage} src = {src} />
				</div>
			</>
		);
	};

    const closeSelectedImage = () => {
        setImgSelected(value)
    }

	return {
        imgSelected,
		handleImageSelected,
        closeSelectedImage
	};
};
