import { ImageLayout } from "../shared/imagelayout";
import { Commentary } from "../shared/comentary";
import { useParams } from "react-router-dom";
import { Publications } from "../shared/publications";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useReducer } from "react";
import { ShareButton, ThreeDots } from "../shared/publicationOptions";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ImageContext } from "../../context/imageSelectedContext";
import { useContext } from "react";
import publicationsJson from "../../fakeData/publications.json";

import backArrow from "../../assets/arrow-left-short 1.svg";
import arrow from "../../assets/arrow.svg";
import threeDots from "../../assets/three-dots.svg";
import share from "../../assets/box-arrow-up.svg";
import link from "../../assets/link-45deg.svg";
import usericon from "../../assets/person-circle.svg";
import heart from "../../assets/heart-fill-red.svg";

export const OpenPublication = () => {
	const [isComentsOpen, setIsComentsOpen] = useState(false);
	const navigate = useNavigate();
	const { image } = useContext(ImageContext);

	const { id } = useParams();

	const coment = [...Array(3)].map((x, i) => (
		<div key={i} className="my-2">
			<Commentary user={"user"} coment={"muy lindo"} heart={heart} />
		</div>
	));

	const jsonInfo = publicationsJson.filter((p) => p.publicationid == id);

	const [img, setImg] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [userName, setUuserName] = useState("");
	const [layoutHtml, setLayoutHtml] = useState({ code: <></> });

	const ref = useRef(null);
	const scrollToTop = () => {
		ref.current.scroll({
			top: 0,
		});
	};

	useEffect(() => {
		try {
			setImg(jsonInfo[0].photoURL);
			setTitle(jsonInfo[0].title);
			setDescription(jsonInfo[0].description);
			setUuserName(jsonInfo[0].userName);
			scrollToTop();
			setLayoutHtml({
				...layoutHtml,
				code: (
					<>
						{console.log(jsonInfo[0].hashtags)}
						<ImageLayout words={jsonInfo[0].hashtags} pid={jsonInfo[0].publicationid}/>
					</>
					
				),
			});		

		} catch (error) {
			console.log(error);
			navigate("/home");
		}
	}, [, id]);

	/**
	 * Hook that alerts clicks outside of the passed ref
	 */
	const [shareVisibility, setShareVisibility] = useState(false);
	const [threeDotsVisibility, setThreeDotsVisibility] = useState(false);
	const shareUrl = `${window.location}`;
	function useOutsideAlerter(ref) {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					//alert("You clicked outside of me!");
					setShareVisibility(false);
					setThreeDotsVisibility(false);
				}
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	const wrapperRef = useRef(null);
	const nullRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	/**
	 *
	 */

	return (
		<>
			<div
				ref={ref}
				id="page-container"
				className="
                    w-screen h-[calc(100vh-80px)] overflow-auto overflow-x-hidden
                    flex place-items-center flex-col"
			>
				<div
					id="publication-container"
					className="w-[688px] h-auto
                        bg-secondary-light rounded-2xl
                        mt-6 shadow-[0px_0px_27px_-5px_rgba(0,0,0,0.25)]
                        flex gap-3"
				>
					<div>
						<img
							id="image"
							src={img}
							alt=""
							className="w-[344px] h-auto max-h-[640px] min-h-[120px]
                                rounded-2xl object-fit
                                select-none object-cover"
						/>
					</div>

					<div id="info-container flex flex-col">
						<div id="options" className="flex gap-3 mt-4 relative">
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<div
									onClick={() => setThreeDotsVisibility(true)}
									className={`h-8 w-8 rounded-full
								    	hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]
								        ${
													threeDotsVisibility
														? "shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]"
														: ""
												}
								        flex place-content-center place-items-center`}
								>
									<img src={threeDots} alt="" className="w-6" />
								</div>
							</motion.div>

							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
								onClick={() => setShareVisibility(true)}
							>
								<div
									className={`h-8 w-8 rounded-full
                                        hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]
                                        ${
																					shareVisibility
																						? "shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]"
																						: ""
																				}
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

							<div id="options" className="absolute top-11 left-0">
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
										<ThreeDots src={img} />
									</div>
								</div>
							</div>
						</div>
						<h1 className="font-semibold text-2xl mt-3"> {title} </h1>
						<p className="w-[308px] text-sm mt-6">{description}</p>
						<div
							id="user"
							className="
								flex gap-2 place-items-center
								text-lg mt-6"
						>
							<img src={usericon} alt="" className="w-8 select-none" />
							<h1>{userName}</h1>
						</div>
						<div
							id="commentaries-title"
							className="flex gap-4 mt-3 mb-3 select-none"
						>
							<h1 className="text-base font-semibold">3 Commentaries</h1>
							<motion.button
								onClick={() => setIsComentsOpen(!isComentsOpen)}
								className={`h-6 w-6 hover:bg-secondary-highlight
									pt-[1px] rounded-full
									flex place-items-center place-content-center`}
								initial={{ rotate: -90 }}
								animate={{
									rotate: isComentsOpen ? 0 : -90,
								}}
								transition={{ type: "spring", stiffness: 400, damping: 20 }}
							>
								<img src={arrow} alt="" className="" />
							</motion.button>
						</div>
						<motion.div
							id="commentaries"
							className="max-h-[250px] overflow-auto"
							initial={{ height: 0 }}
							animate={{
								height: isComentsOpen ? "" : 0,
							}}
						>
							<div>{coment}</div>
						</motion.div>

						<div
							id="add-commentary-input"
							className="flex gap-2 mt-3 mb-6 select-none"
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
				<h2 className="text-primary-dark font-semibold text-xl my-6">
					Related publications
				</h2>
				<div className="w-screen flex ">
					<div
						id="imageLayout-container"
						className="grow pr-6 h-full pt-2 overflow-x-hidden overflow-y-auto "
					>
						{layoutHtml.code}
					</div>
					<div
						className="
								h-[calc(100vh-90px)] w-fit mr-2 mt-2
								rounded-2xl
								sticky top-2"
					>
						{image.code}
					</div>
				</div>

				<button
					className="absolute top-6 left-20 
                    		bg-primary-light rounded-full p-3 opacity-70
                        	hover:opacity-100
                       		 hover:bg-secondary-light
                        	hover:shadow-md"
				>
					<img
						id="backArrow"
						src={backArrow}
						alt=""
						className="h-5"
						onClick={() => navigate("/home")}
					/>
				</button>
			</div>
		</>
	);
};
