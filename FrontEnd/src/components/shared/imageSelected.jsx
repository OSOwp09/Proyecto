import { ImageLayout } from "./imagelayout";
import { Commentary } from "./comentary";
import { ImageContext } from "../../context/imageSelectedContext";
import { useNavigate } from "react-router-dom";
import { ShareButton, ThreeDots } from "./publicationOptions";

import publicationsJson from "../../fakeData/publications.json";

import closeX from "../../assets/x-circle.svg";
import threeDots from "../../assets/three-dots.svg";
import share from "../../assets/box-arrow-up.svg";
import link from "../../assets/link-45deg.svg";
import usericon from "../../assets/person-circle.svg";
import heart from "../../assets/heart-fill-red.svg";
import arrow from "../../assets/arrow.svg";
import openArrow from "../../assets/arrow-up-right-circle.svg";

import { useContext, useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useClickOutside from "../../customHooks/useClickOutside";

export const ImageSelected = ({ close }) => {
	const navigate = useNavigate();
	const { image } = useContext(ImageContext);

	const shareUrl = `${window.location.host}/home/publication/${image.id}`;

	//console.log("image", image);

	// const hashtagsImg = publicationsJson.filter(
	// 	(p) => p.publicationid == image.id
	// )[0].hashtags;

	// const publicationId = publicationsJson.filter(
	// 	(p) => p.publicationid == image.id
	// )[0].publicationid;

	const [isHoverOpen, setIsHoverOpen] = useState(false);
	const [isHoverImg, setIsHoverImg] = useState(false);
	const [isComentsOpen, setIsComentsOpen] = useState(false);

	const divScrollRef = useRef(null);
	const scrollToTop = () => {
		divScrollRef.current.scroll({
			top: 0,
		});
	};

	const [shareVisibility, setShareVisibility] = useState(false);
	const [threeDotsVisibility, setThreeDotsVisibility] = useState(false);

	const wrapperRefShare = useRef(null);
	const wrapperRefDots = useRef(null);
	const nullRef = useRef(null);

	const outsideShare = useClickOutside(wrapperRefShare);
	const outsideDots = useClickOutside(wrapperRefDots);

	useEffect(() => {
		if (outsideShare.outside == true) {
			setShareVisibility(false);
		}
		outsideShare.setOutside(false);
	}, [outsideShare]);

	useEffect(() => {
		if (outsideDots.outside == true) {
			setThreeDotsVisibility(false);
		}
		outsideDots.setOutside(false);
	}, [outsideDots]);

	const handdleOnOpenBtnClick = () => {
		navigate(`/home/publication/${image.id}`);
		close();
	};

	const [html, setHtml] = useState(<></>);
	useEffect(() => {
		setHtml(
			<>
				<ImageLayout
					words={image.hashtags}
					//pid = {publicationId} // para poder eliminar de las lista a la misma publicacion, y no aparezca
					pid={image.id} // para poder eliminar de las lista a la misma publicacion, y no aparezca
				/>
			</>
		);
	}, [, image]);

	return (
		<>
			<div className="pt-2 h-full relative">
				<div
					ref={divScrollRef}
					id="container"
					className="bg-secondary-light
					h-[calc(100vh-66px)]
					w-[520px] overflow-auto overflow-x-hidden
					rounded-2xl
					drop-shadow-xl
					font-inter text-primary-dark 
					relative"
				>
					<motion.div
						id="options"
						className="
						sticky top-0 z-50 
						flex place-content-between place-items-center gap-2 
						select-none"
					>
						<motion.div
							className="p-2
							rounded-full bg-secondary-light
							shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.50)]"
							initial={{ scale: 0.8 }}
							whileHover={{ scale: 1 }}
						>
							<img
								id="close"
								onClick={() => close()}
								src={closeX}
								alt=""
								className="h-6"
							/>
						</motion.div>

						<motion.div
							className="flex gap-2
							py-1 px-3 
							rounded-full bg-secondary-light
							shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.50)]"
							initial={{ scale: 0.8 }}
							whileHover={{ scale: 1 }}
						>
							<motion.div
								id="dots"
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
									<img src={threeDots} alt="" className="w-5" />
								</div>
							</motion.div>

							<motion.div
								id="share"
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
								onMouseUp={() => setShareVisibility(true)}
							>
								<div
									className={`h-8 w-8 rounded-full
								hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]
								${shareVisibility ? "shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]" : ""}
								flex place-content-center place-items-center`}
								>
									<img src={share} alt="" className="w-5" />
								</div>
							</motion.div>

							<motion.div
								id="link"
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
						</motion.div>

						<motion.div
							className="
							p-2
							rounded-full bg-secondary-light
							shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.50)]"
							initial={{ scale: 0.8 }}
							whileHover={{ scale: 1 }}
						>
							<img
								id="open"
								src={openArrow}
								alt=""
								className="h-6"
								onClick={() => handdleOnOpenBtnClick()}
							/>
						</motion.div>

						<div id="options" className="absolute top-10 left-[178px] z-50">
							<div
								ref={shareVisibility ? wrapperRefShare : nullRef}
								className={`${shareVisibility ? "block" : "hidden"} translate-x-[-114px]`}
							>
								<ShareButton src={shareUrl} />
							</div>

							<div
								ref={threeDotsVisibility ? wrapperRefDots : nullRef}
								className={`${threeDotsVisibility ? "block" : "hidden"}`}
							>
								<div>
									<ThreeDots src={image.src} />
								</div>
							</div>
						</div>
					</motion.div>

					<div
						id="image-and-info"
						className="flex flex-col h-auto /max-h-[448px] /px-[48px]
						"
					>
						<div
							id="image"
							className="
							select-none
							flex place-content-center"
						>
							<div
								className="bg-secondary-light 
							shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.50)]
							p-1 rounded-2xl"
							>
								<img
									src={image.src}
									alt=""
									className="
									h-auto max-h-[572px]
									w-auto max-w-[500px]
									rounded-2xl object-cover"
								/>
							</div>
						</div>
						<div
							id="user-Title-and-commentaries"
							className="
							p-4 mt-1
							rounded-2xl 
						shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.50)]"
						>
							<div
								id="user"
								className="
								flex gap-2 place-items-center
								text-lg"
							>
								<img src={usericon} alt="" className="w-8 select-none" />
								<h1>{image.user}</h1>
							</div>
							<h1
								id="title"
								className="w-full max-h-16 text-2xl font-semibold mt-2 break-words"
							>
								{image.title}
							</h1>
							<h1
								id="description"
								className="w-full max-h-16 text-md font-regular break-words"
							>
								{image.description}
							</h1>
						</div>
					</div>

					<div
						id="more-images"
						className="/mr-4 
							p- mt-1
							rounded-2xl 
							shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.50)]
							flex flex-col place-items-center gap-4"
						onClick={() => {
							scrollToTop(), console.log("paArriba");
						}}
					>
						<h1
							className="
						font-semibold"
						>
							Related publications
						</h1>
						{html}
					</div>
				</div>
			</div>
		</>
	);
};
