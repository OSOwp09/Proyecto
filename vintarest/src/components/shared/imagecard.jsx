import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import usericon from "../../assets/person-circle.svg";
import { ImageContext } from "../../context/imageSelectedContext";
import { useNavigate } from "react-router-dom";

import openArrow from "../../assets/arrow-up-right-circle.svg";

export const ImageCard = ({ image, title, description, userName, id, hashtags }) => {
	const { handleImageSelected } = useContext(ImageContext);

	const navigate = useNavigate();
	//console.log("hashtags:",hashtags)

	const handdleInput = () => {
		//closeSelectedImage()
		handleImageSelected(image, title,description, id, hashtags, userName);
	};
	const [isHoverOpen, setIsHoverOpen] = useState(false);
	const handdleOnOpenBtnClick = () => {
		navigate(`/home/publication/${image.id}`);
	};

	return (
		<>
			<div
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
						overflow-hidden relative"
				>
					{/* <motion.div
						className="box"
						initial={"imgNotHover"}
						whileHover={"imgHover"}
					> */}
						<img
							onClick={() => {
								handdleInput();
							}}
							src={image}
							alt=""
							className="
							w-[240px] h-auto max-h-[480px] min-h-[120px]
							rounded-t-2xl object-fit
							mb-2 select-none"
						/>
						
						{/* <img src={openArrow} alt="" 
						className=""
						/> */}

						{/* <motion.button
							id="arrowContainer"
							className={`h-auto w-auto absolute bottom-2 m-2 drop-shadow-md
									/opacity-50
									hover:opacity-100`}
							onClick={() => handdleOnOpenBtnClick()}
							onHoverStart={() => setIsHoverOpen(true)}
							onHoverEnd={() => setIsHoverOpen(false)}
							variants={{
								imgNotHover: { scale: 1, opacity: 0 },
								imgHover: { scale: 1.6, opacity: 1 },
							}}
						>
							<svg
								id="circle1"
								className="absolute bottom-0
										h-6 w-6 bg-secondary-light rounded-full"
							/>
							<motion.div
								id="rectangle"
								className="absolute bottom-0 left-[12px]
										h-6 w-2 bg-secondary-light"
								style={{ originX: 0 }}
								animate={{
									scaleX: isHoverOpen ? 5.625 : 0,
								}}
								transition={{ duration: 0.23 }}
							/>
							<motion.div
								id="h1"
								className="absolute bottom-0 left-0 rounded-l-full
										h-6 w-[12px]  bg-secondary-light
										overflow-hidden"
								animate={{
									width: isHoverOpen ? 45 : 12,
								}}
								transition={{ duration: 0.23 }}
							>
								<h1 className="absolute bottom-0 mx-1">Open</h1>
							</motion.div>
							<motion.div
								id="circle2"
								className="absolute bottom-0
										h-6 w-6 bg-secondary-light rounded-full
										p-1"
								animate={{
									translateX: isHoverOpen ? "45px" : "0px",
								}}
								transition={{ duration: 0.25 }}
							>
								<img src={openArrow} alt="" />
							</motion.div>
						</motion.button>
					</motion.div> */}
				</div>
				<div id="description-container" className="p-1">
					<h1
						id="description"
						className="h-[14px] w-[240px] font-semibold flex place-items-center"
					>
						{title}
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
