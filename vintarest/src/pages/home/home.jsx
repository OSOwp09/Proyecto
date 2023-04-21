import { ImageLayout } from "../../components/shared/imagelayout";

import { ImageContext } from "../../context/imageSelectedContext";
import { useContext } from "react";

export const Home = () => {
	const { image } = useContext(ImageContext);
	return (
		<>
			<div className="w-screen flex gap-2">
				<div
					id="imageLayout-container"
					className="grow pr-6 h-full pt-2 overflow-x-hidden overflow-y-auto "
				>
					<ImageLayout />
				</div>
				<div
				className="mt-2">{image.code}</div>
			</div>
		</>
	);
};
