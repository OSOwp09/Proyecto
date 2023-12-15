import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import usericon from "../../assets/person-circle.svg";
import { ImageContext } from "../../context/imageSelectedContext";
import { useNavigate } from "react-router-dom";

import openArrow from "../../assets/arrow-up-right-circle.svg";

export default function ImageCard ({
	image,
	title,
	description,
	userName,
	id,
	hashtags,
}) {
	const { handleImageSelected } = useContext(ImageContext);

	const navigate = useNavigate();
	//console.log("hashtags:",hashtags)

	const handdleInput = () => {
		//closeSelectedImage()
		handleImageSelected(image, title, description, id, hashtags, userName);
	};
	const [isHoverOpen, setIsHoverOpen] = useState(false);

	const handdleOnOpenBtnClick = () => {
		navigate(`/home/publication/${id}`);
	};

	const handdleUserClick = () =>{
		navigate(`/home/${userName}`);
	}

	return (
		<>
			<div
				id="container"
				className="
				group
                bg-secondary-light
                h-full w-[240px] rounded-2xl
                mb-2 mx-1
                font-inter text-[14px] text-primary-dark break-inside-avoid
				drop-shadow
				hover:drop-shadow-xl"
			>
				<div
					className="w-[240px] h-auto max-h-[448px] min-h-[120px]
                        rounded-t-2xl object-fit
                        select-none
						overflow-hidden relative"
				>
					<div className="relative">
						<img
							onClick={() => {
								handdleInput();
							}}
							src={image}
							alt=""
							className="
							w-[240px] h-auto max-h-[480px] min-h-[120px]
							rounded-t-2xl object-fit
							select-none"
							loading="lazy"
						/>

						<div 
						onClick={() => {
							handdleInput();
						}}
						className="
						absolute top-0 left-0
						h-full w-full
						bg-primary-dark opacity-50
						hidden group-hover:block"></div>

						
					</div>
				</div>
				<div id="description-container" className="p-2 relative">
					<h1
						id="description"
						className="h-[14px] w-[240px] font-semibold flex place-items-center"
					>
						{title}
					</h1>
					<div
						id="user"
						onClick={()=>handdleUserClick()}
						className="h-[32px] flex place-items-center gap-1 mt-1"
					>
						<img src={usericon} alt="" className="h-[32px] select-none" />
						<h1>{userName}</h1>
						<h1></h1>
					</div>

					<div
							id="open-publications"
							onClick={() => handdleOnOpenBtnClick()}
							className="
							group/open
							h-auto w-auto
							transition-all duration-[300ms] delay-0 ease-in
							absolute 
							top-[-30px] hover:top-[-36px] 
							left-0 group-hover:left-2
							opacity-0 group-hover:opacity-100
							hidden group-hover:block"
						>
							<div
								className="relative
								h-6 w-auto
								transition-all duration-[300ms] delay-0 ease-in
								translate-x-[8px] group-hover/open:translate-x-[12px]
								group-hover/open:mb-2
								group-hover/open:ml-2
								opacity-80 group-hover/open:opacity-100
								group-hover/open:scale-[1.5]
								animate-bounce group-hover/open:animate-none"
							>
								<div
									className="/absolute bottom-0 left-0 delay-0 ease-in
									overflow-hidden
									transition-all duration-[300ms]
									rounded-2xl /group-hover/open:rounded-2xl
									h-6 w-6 group-hover/open:w-[74px]
									bg-secondary-light /rounded-l-2xl "
								>
									<p
										className=" px-2 pt-[2px] 
										/group-hover/open:w-[5px] 
									"
									>
										Open
									</p>
								</div>
								<div
									className="
									transition-all duration-[300ms] delay-0 ease-in
									absolute bottom-0 right-0 h-6 w-6
									group-hover/open:rotate-[45deg]"
								>
									<img
										src={openArrow}
										alt=""
										className="								
										h-6 w-6 bg-secondary-light rounded-full p-[1px]"
									/>
								</div>
							</div>
						</div>
				</div>
			</div>
		</>
	);
};
