import React, { useContext } from "react";
import { motion } from "framer-motion";
import usericon from "../../assets/person-circle.svg";
import { ImageContext } from "../../context/imageSelectedContext";

export const ImageCard = ({ image, description, userName, id, hashtags }) => {
	const { handleImageSelected } = useContext(ImageContext);

	//console.log("hashtags:",hashtags)

	const handdleInput = () => {
		//closeSelectedImage()
		handleImageSelected(image, description, id, hashtags);
	}
	
	return (
		<>
			<div
				onClick={() => {
					handdleInput()
				}}
				id="container"
				className="
                bg-secondary-light
                h-full w-[240px] rounded-2xl
                mx- mb-2
                font-inter text-[14px] text-primary-dark break-inside-avoid
				drop-shadow
				hover:drop-shadow-xl"
			>
				<div
					className="w-[240px] h-auto max-h-[448px] min-h-[120px]
                        rounded-t-2xl object-fit
                        mb-2 select-none
						overflow-hidden"
				>
					{/* <motion.div
						className="box"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					> */}
					<img
						src={image}
						alt=""
						className="w-[240px] h-auto max-h-[480px] min-h-[120px]
							rounded-t-2xl object-fit
							mb-2 select-none"
					/>
					{/* </motion.div> */}
				</div>
				<div id="description-container" className="p-1">
					<h1
						id="description"
						className="h-[14px] w-[240px] font-semibold flex place-items-center"
					>
						{description}
					</h1>
					<div
						id="user"
						className="h-[32px] flex place-items-center gap-1 mt-1"
					>
						<img src={usericon} alt="" className="h-[32px] select-none" />
						<h1>{userName}</h1>
						<h1></h1>
					</div>
				</div>
			</div>
		</>
	);
};
