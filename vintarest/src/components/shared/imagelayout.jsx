import { ImageCard } from "./imagecard";

export const ImageLayout = ({ selectImg }) => {
	const imagesArray = [
		"https://i.pinimg.com/474x/bf/03/5e/bf035ea8a81953b94d1ae8bf73346516.jpg",
		"https://i.pinimg.com/474x/58/fb/6c/58fb6c4552240b643403a71443ed8a7c.jpg",
		"https://i.pinimg.com/474x/22/58/5f/22585f1c269b30cf64406f78993c9eb4.jpg",
		"https://i.pinimg.com/474x/f5/b0/84/f5b0847df99ee4552d125dcbb0d9dca7.jpg",
		"https://i.pinimg.com/474x/1d/97/ef/1d97efec244f4588042476d05e56aebd.jpg",
		"https://i.pinimg.com/474x/ba/46/32/ba4632fa065d29fc6d8d2590675ed59b.jpg",
		"https://i.pinimg.com/474x/34/c4/17/34c4179e6e919d41ac9731fa63839e1c.jpg",
		"https://i.pinimg.com/474x/b6/c5/9d/b6c59d16e0db8a44a7c5f747e36bce46.jpg",
		"https://i.pinimg.com/474x/98/7f/d1/987fd1abb3d5db4e196d6cf028b54b61.jpg",
		"https://i.pinimg.com/474x/9e/47/21/9e47215f3c1457014c288a65a00ae598.jpg",
		"https://i.pinimg.com/474x/90/65/72/906572b13a8992b9dcee98a7cac2dbae.jpg",
		"https://i.pinimg.com/474x/6c/26/98/6c2698a062d5269bf02608e34a263e60.jpg",
		"https://i.pinimg.com/474x/5f/5f/d0/5f5fd01c78a3d6d707794967c29ae521.jpg",
		"https://i.pinimg.com/474x/0e/b3/4d/0eb34dd62b01ecdc7fb25d53e334e9f4.jpg",
		"https://i.pinimg.com/474x/4e/62/74/4e6274c3d868fa28eb98710f6f0b340d.jpg",
		"https://i.pinimg.com/474x/01/58/7f/01587f473d290e4321c7a1a1f1f1cf81.jpg",
		"https://i.pinimg.com/474x/31/f9/bf/31f9bf7752a1f4d8980773ab10219f68.jpg",
		"https://i.pinimg.com/474x/0d/cd/06/0dcd06021ba6560e56c4879fbb1b9365.jpg",
	];

	const images = [...Array(imagesArray.length)].map(
		(image = imagesArray, i) => (
			<ImageCard
				selectImg={selectImg}
				image={image[i]}
				description={"Image " + i}
				userName={"User"}
			/>
		)
	);

	return (
		<>
			<div
				className=" 
				columns-[14rem] 
				h-auto w-auto"
			>
				{images}
			</div>
		</>
	);
};
