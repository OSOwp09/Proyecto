import { ImageLayout } from "./imagelayout";
import { Commentary } from "./comentary";
import { ImageContext } from "../../context/imageSelectedContext";
import { useNavigate } from "react-router-dom";
import { ShareButton, ThreeDots } from "./publicationOptions";

import closeX from "../../assets/x-circle.svg";
import threeDots from "../../assets/three-dots.svg";
import share from "../../assets/box-arrow-up.svg";
import link from "../../assets/link-45deg.svg";
import usericon from "../../assets/person-circle.svg";
import heart from "../../assets/heart-fill-red.svg";
import arrow from "../../assets/arrow.svg";
import openArrow from "../../assets/arrow-up-right-circle.svg";

import { useContext, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useClickOutside from "../../customHooks/useClickOutside";

export const ImageSelected = ({ close }) => {
	const navigate = useNavigate();
	const { image } = useContext(ImageContext);

	const shareUrl = `${window.location.host}/home/publication/${image.id}`;

	const [isHoverOpen, setIsHoverOpen] = useState(false);
	const [isHoverImg, setIsHoverImg] = useState(false);

	const coment = [...Array(10)].map((x, i) => (
		<div className="my-2">
			<Commentary user={"user"} coment={"muy lindo"} heart={heart} />
		</div>
	));

	const divRef = useRef(null);

	const scrollToTop = () => {
		divRef.current.scroll({
			top: 0,
		});
	};

	const [shareVisibility, setShareVisibility] = useState(false);
	const [threeDotsVisibility, setThreeDotsVisibility] = useState(false);

	const wrapperRef = useRef(null);
	const nullRef = useRef(null);
	const outside = useClickOutside(wrapperRef);

	useEffect(() => {
		setTimeout(()=>{})
		if (outside.outside == true) {
			setShareVisibility(false);
			setThreeDotsVisibility(false);
			outside.setOutside(false);
		}
	}, [outside]);

	return (
		<>
			<div className="pt-2 pb-2 h-full">
				<div
					ref={divRef}
					id="container"
					className="bg-secondary-light
					h-full
					w-[520px] overflow-auto
					rounded-2xl
					drop-shadow-xl
					font-inter text-primary-dark 
					relative"
				>
					<div
						id="options"
						className="px-2 py-2 mb-2 flex place-items-center gap-3 select-none"
					>
						<img
							onClick={() => close()}
							src={closeX}
							alt=""
							className="h-7
							hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)] rounded-full"
						/>

						<motion.div
							whileTap={{ scale: 0.9 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
							onClick={() => setThreeDotsVisibility(true)}
						>
							<div
								className={`h-8 w-8 rounded-full
								hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]
								${threeDotsVisibility ? "shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]" : ""}
								flex place-content-center place-items-center`}
							>
								<img src={threeDots} alt="" className="w-6" />
							</div>
						</motion.div>

						<motion.div
							whileTap={{ scale: 0.9 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
							onClick={() => setShareVisibility(true)}
							on
						>
							<div
								className={`h-8 w-8 rounded-full
								hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]
								${shareVisibility ? "shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]" : ""}
								flex place-content-center place-items-center`}
							>
								<img src={share} alt="" className="w-6" />
							</div>
						</motion.div>
						<motion.div
							whileTap={{ scale: 0.9 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<CopyToClipboard text={shareUrl}>
								<div
									className={`h-8 w-8 rounded-full
									hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]
									flex place-content-center place-items-center`}
								>
									<img src={link} alt="" className="w-6" />
								</div>
							</CopyToClipboard>
						</motion.div>
					</div>
					<div
						id="image-and-comentaries"
						className="flex gap-4 h-auto max-h-[448px] px-2"
					>
						<div id="image" className="select-none">
							<div
								className="h-auto relative"
								onMouseEnter={() => setIsHoverImg(true)}
								onMouseLeave={() => setIsHoverImg(false)}
							>
								<img
									src={image.src}
									alt=""
									className="
									w-[240px] h-[auto] max-h-[448px] min-h-[120px]
									rounded-2xl object-cover"
								/>

								<motion.button
									id="arrowContainer"
									className={`h-auto w-auto absolute bottom-0 m-2 drop-shadow-md
									${isHoverImg ? "visible" : "invisible"}
									opacity-50
									hover:opacity-100`}
									onClick={() => navigate(`/home/publication/${image.id}`)}
									initial={false}
									style={{ scale: 1.6 }}
									animate={isHoverOpen ? "hover" : "notHover"}
									onHoverStart={() => setIsHoverOpen(true)}
									onHoverEnd={() => setIsHoverOpen(false)}
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
										variants={{
											hover: { transform: "scaleX(5.625) " },
											notHover: { transform: "scaleX(0) " },
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
										variants={{
											hover: { transform: "translateX(45px)" },
											notHover: { transform: "translateX(0px)" },
										}}
										transition={{ duration: 0.25 }}
									>
										<img src={openArrow} alt="" />
									</motion.div>
								</motion.button>
							</div>
						</div>
						<div id="user-Title-and-commentaries" className="">
							<h1
								id="title"
								className="w-[240px] max-h-16 text-2xl font-semibold my-2 break-words"
							>
								{image.title}
							</h1>
							<div
								id="user"
								className="
								flex gap-2 place-items-center
								text-lg"
							>
								<img src={usericon} alt="" className="w-8 select-none" />
								<h1>User</h1>
							</div>
							<div
								id="commentaries-title"
								className="flex gap-4 mt-3 mb-3 select-none"
							>
								<h1 className="text-base font-semibold">3 Commentaries</h1>
								<img src={arrow} alt="" className="pt-1" />
							</div>
							<div id="commentaries" className=" max-h-[250px] overflow-auto">
								<div>{coment}</div>
							</div>
							<div
								id="add-commentary-input"
								className="flex gap-2 mt-3 select-none"
							>
								<img src={usericon} alt="" className="w-12" />
								<input
									type="text"
									placeholder="Add comment"
									className="
									bg-secondary-light
									h-12 w-[176px]
									px-2 
									border border-primary-dark rounded-2xl
									outline-none"
								/>
							</div>
						</div>
					</div>
					<div
						id="more-images"
						className="mr-4 mt-4"
						onClick={() => scrollToTop()}
					>
						<ImageLayout />
					</div>
					<div id="options" className="absolute top-10 left-2">
						<div
							ref={shareVisibility ? wrapperRef : nullRef}
							className={`${shareVisibility ? "block" : "hidden"}`}
						>
							<ShareButton src={shareUrl} />
						</div>

						<div
							ref={threeDotsVisibility ? wrapperRef : nullRef}
							className={`${threeDotsVisibility ? "block" : "hidden"}`}
						>
							<div>
								<ThreeDots src={image.src} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
