import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import usericon from "../../assets/person-circle.svg";
import { ImageContext } from "../../context/imageSelected/imageSelectedContext";
import { useNavigate } from "react-router-dom";

import openArrow from "../../assets/arrow-up-right-circle.svg";

export default function ImageCard({
	image,
	title,
	description,
	userName,
	id,
	hashtags,
	hexColoraverageColor,
	imageSize,
}) {
	const { handleImageSelected } = useContext(ImageContext);

	const navigate = useNavigate();

	const handdleInput = () => {
		handleImageSelected(image, title, description, id, hashtags, userName);
	};

	const handdleOnOpenBtnClick = () => {
		navigate(`/home/publication/${id}`);
	};

	const handdleUserClick = () => {
		navigate(`/home/${userName}`);
	};

	const w = imageSize[0];
	const h = imageSize[1];
	const hex = hexColoraverageColor;

	//Desktop
	const desktopImageCard = () => {
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
							<svg
								width={w}
								height={h}
								viewBox={`0 0 ${w} ${h}`}
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="w-[calc(240px)] h-full
								object-cover pb-[0.3px]  rounded-t-2xl"
							>
								<rect x="0" y="0" width={w} height={h} fill={hex} />
							</svg>

							<img
								onClick={() => {
									handdleInput();
								}}
								src={image}
								alt=""
								className="absolute top-0 left-0
								w-[240px] h-full max-h-[480px] min-h-[120px]
								object-cover
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
						hidden group-hover:block"
							></div>
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
							onClick={() => handdleUserClick()}
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

	//Mobile
	const mobileImageCard = () => {
		return (
			<div className="min-[304px]:w-[48vw]  min-[724px]:w-[30vw] 
			py-1 px-[4px] rounded-2xl relative mb-2 mx-1
			drop-shadow-md">
				<svg
					width={w}
					height={h}
					viewBox={`0 0 ${w} ${h}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="translate-x-[-3px] w-[calc(100%+6px)] 
						scale-y-[1.01] h-full
						min-h-[120px] object-cover rounded-2xl "
				>
					<rect x="0" y="0" width={w} height={h} fill={hex} />
				</svg>

				<img
					onClick={() => {
						handdleOnOpenBtnClick();
					}}
					src={image}
					alt=""
					className="	absolute top-0 left-0 
						w-full h-full min-h-[120px] object-cover rounded-2xl /opacity-25"
					loading="lazy"
				/>
			</div>
		);
	};

	return (
		<>
			<div className="block  sm:hidden">{mobileImageCard()}</div>
			<div className="hidden sm:block">{desktopImageCard()}</div>
		</>
	);
}
