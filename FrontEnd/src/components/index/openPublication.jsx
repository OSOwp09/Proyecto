
import { Commentary } from "../shared/comentary";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, lazy } from "react";
//import { ImageLayout } from "../shared/imagelayout";
const ImageLayout = lazy(()=> import("../shared/imagelayout"))

import { ShareButton, ThreeDots } from "../shared/publicationOptions";

import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ImageContext } from "../../context/imageSelected/imageSelectedContext";
import { openShareOptions } from "../../store/slices/shareOptions/shareOptionsThunks";
import { openPublicationsOptions } from "../../store/slices/publicationsOptions/publicationsOptionsThunk";
import {
	createListOfComments,
	openListOfComments,
} from "../../store/slices/commentsList/commentsListThunk";
import { useContext } from "react";
import { FindPublicationApi, CreateCommentApi } from "../../api/Api";
import publicationsJson from "../../fakeData/publications.json";

import backArrow from "../../assets/arrow-left-short 1.svg";
import arrow from "../../assets/arrow.svg";
import threeDots from "../../assets/three-dots.svg";
import share from "../../assets/box-arrow-up.svg";
import link from "../../assets/link-45deg.svg";
import usericon from "../../assets/person-circle.svg";
import heart from "../../assets/heart-fill-red.svg";
import send from "../../assets/send.svg";
import { useDispatch, useSelector } from "react-redux";

export default function OpenPublication() {
	const navigate = useNavigate();
	const { image } = useContext(ImageContext);

	const { id } = useParams(); // id extracted from the browser url

	const currentUserInfo = useSelector((state) => state.auth);
	const listOfComments = useSelector((state) => state.commentsList);

	const [img, setImg] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [userName, setUuserName] = useState("");
	const [comments, setComments] = useState(<></>);

	const [layoutHtml, setLayoutHtml] = useState({ code: <></> });

	const refDesktop = useRef(null);
	const refMobile = useRef(null);
	const scrollToTop = () => {
		refDesktop?.current?.scroll({
			top: 0,
		});

		refMobile?.current?.scroll({
			top: 0,
		});
	};

	const handdleLoadPublication = async () => {
		try {
			const resp = await FindPublicationApi.get("", {
				params: {
					id: id,
				},
			});
			scrollToTop();

			const publicationInfo = resp.data.publication;
			const userInfo = resp.data.publication.userId;

			setImg(publicationInfo.photoURL);
			setTitle(publicationInfo.title);
			setDescription(publicationInfo.description);
			setUuserName(userInfo.user);

			const commentsInfo = resp.data.commentaries;
			const commentariesCant = commentsInfo.length;

			const comentsList = [...Array(commentariesCant)].map((x, i) => (
				<div key={i} className="my-2">
					<Commentary
						user={commentsInfo[i].userId.user}
						coment={commentsInfo[i].text}
						date={commentsInfo[i].date}
					/>
				</div>
			));

			dispatch(createListOfComments(commentsInfo));

			setComments(comentsList.reverse());

			setLayoutHtml({
				...layoutHtml,

				code: (
					<>
						<ImageLayout
							words={publicationInfo.hashtags}
							pid={publicationInfo.id}
						/>
					</>
				),
			});
		} catch (error) {
			console.log(error);
			navigate("/home");
		}
	};

	const handleLoadComments = async () => {
		try {
			const resp = await FindPublicationApi.get("", {
				params: {
					id: id,
				},
			});

			const commentsInfo = resp.data.commentaries;
			const commentariesCant = commentsInfo.length;

			const comentsList = [...Array(commentariesCant)].map((x, i) => (
				<div key={i} className="my-2">
					<Commentary
						user={commentsInfo[i].userId.user}
						coment={commentsInfo[i].text}
						date={commentsInfo[i].date}
					/>
				</div>
			));

			dispatch(createListOfComments(commentsInfo));

			setComments(comentsList.reverse());
		} catch (error) {
			console.log(error);
			navigate("/home");
		}
	};

	useEffect(() => {
		handdleLoadPublication();
	}, [, id]);

	useEffect(() => {
		handleLoadComments();
	}, [listOfComments.code]);
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

	/**
	 * ---------------------------------------------------------------------------
	 *-------------- Commentaries related code -----------------------------------
	 *----------------------------------------------------------------------------
	 */

	const [isComentsOpen, setIsComentsOpen] = useState(false);
	const [isCommentsFinishedOpen, setIsCommentsFinishedOpen] = useState(false);

	const handdleOpenCommentaries = async () => {
		if (isComentsOpen == false) {
			setTimeout(() => {
				setIsCommentsFinishedOpen(true);
			}, 200);
		} else {
			setIsCommentsFinishedOpen(false);
		}
		setIsComentsOpen(!isComentsOpen);
	};

	/**
	 * handdle the input change and sets a limmit of character in 'maxCommentLength'
	 */
	const [comment, setComment] = useState("");
	const maxCommentLength = 162;
	const handdleInputChange = (e) => {
		const text = e.target.value;
		if (text.length <= maxCommentLength) {
			setComment(text);
			hanndleResizeInput(e);
		}
	};

	/**
	 * The function adjusts the height of the input element based on its content.
	 */
	const hanndleResizeInput = (element) => {
		element.target.style.height = "38px";
		element.target.style.height = element.target.scrollHeight + "px";
	};

	const userInfo = useSelector((state) => state.auth);
	const [token, setToken] = useState("");
	const [userId, serUserId] = useState("");

	useEffect(() => {
		setToken(userInfo.token);
		serUserId(userInfo.uid);
	}, [, userInfo]);

	const comentInputRef = useRef(null);
	const handdleSendComment = async () => {
		if (userInfo.email) {
			if (comment != "") {
				try {
					const currentDate = String(new Date());

					const resp = await CreateCommentApi.post(
						"",
						{
							text: comment,
							date: currentDate,
							publicationId: id,
							userId: userId,
						},
						{
							headers: {
								"x-token": token,
							},
						}
					);

					setComment("");
					comentInputRef.current.style.height = "38px";

					const newComment = () => {
						return (
							<>
								<div className="my-2" key={comments.length + 1}>
									<Commentary
										user={currentUserInfo.user}
										coment={comment}
										date={currentDate}
									/>
								</div>
							</>
						);
					};

					const arr = new Array(comments)[0].reverse();
					arr.push(newComment());

					setComments(arr.reverse());
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	/*---------------------------------------------------------------------------
	 *---------------------------------------------------------------------------
	 *---------------------------------------------------------------------------
	 */

	const [alert, setAlert] = useState(false);

	const linkAlert = () => {
		return (
			<div
				className="transition-all delay-[2000ms]
			/opacity-0"
			>
				<div
					className={`
				h-fit bg-primary-dark rounded-full
				px-4 py-1
				flex place-content-center place-items-center

				transition-all
				${alert ? "translate-y-[-36px]" : "translate-y-[opx]"}
				${alert ? "opacity-100" : "opacity-0"}`}
				>
					<p className="text-secondary-light">Link copied</p>
				</div>
			</div>
		);
	};

	const handdleLinkPressed = async () => {
		setAlert(true);

		setTimeout(() => {
			setAlert(false);
		}, 2000);
	};

	const handdleUserClick = () => {
		try {
			navigate(`/home/${userName}`);
		} catch (error) {}
	};

	/*---------------------------------------------------------------------------
	 *---------------------------------------------------------------------------
	 *---------------------------------------------------------------------------
	 */
	//Desktop

	const desktopOpenPub = () => {
		return (
			<>
				<div
					ref={refDesktop}
					id="page-container"
					className="
                    w-screen h-[calc(100vh-48px)] overflow-auto overflow-x-hidden
                    flex place-items-center flex-col"
				>
					<div
						id="publication-container"
						className={`7w-[688px]  h-auto
						w-auto pr-6
						max-h-[1200px] 
                        bg-secondary-light rounded-2xl
                        mt-6 shadow-[0px_0px_27px_-5px_rgba(0,0,0,0.25)]
                        flex gap-5`}
					>
						<div>
							<img
								id="image"
								src={img}
								alt=""
								className={`
							p-5
							h-auto
							w-[600px] 
							min-h-[300px]
							max-h-[1200px] 
                            rounded-2xl object-fit
                            select-none object-cover`}
							/>
						</div>

						<div
							id="info-container"
							className="relative flex flex-col h-auto min-h-[470px]"
						>
							<div
								id="options"
								className="flex gap-3 mt-4 relative select-none"
							>
								<motion.div
									whileTap={{ scale: 0.9 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									<div
										onClick={() => setThreeDotsVisibility(true)}
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
											onClick={() => handdleLinkPressed()}
											className={`h-8 w-8 rounded-full
											hover:shadow-[0px_0px_10px_-4px_rgba(0,0,0,0.25)]
											flex place-content-center place-items-center`}
										>
											<img src={link} alt="" className="w-6" />
										</div>
									</CopyToClipboard>
								</motion.div>

								<div id="options" className="absolute top-11 left-0 z-50">
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
								<img
									onClick={() => handdleUserClick()}
									src={usericon}
									alt=""
									className="w-8 select-none"
								/>
								<h1>{userName}</h1>
							</div>
							<div
								id="commentaries-title"
								className="flex gap-4 mt-3 mb-3 select-none"
							>
								<h1 className="text-base font-semibold">
									{comments.length} Commentaries
								</h1>
								<motion.button
									onClick={() => handdleOpenCommentaries()}
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
								className={`
								h-auto
								max-h-[300px] 
								${isCommentsFinishedOpen ? "overflow-auto" : "overflow-hidden"}`}
								initial={{ height: 0 }}
								animate={{
									height: isComentsOpen ? "" : 0,
								}}
								transition={{ duration: 0.2 }}
							>
								<div>{comments}</div>
							</motion.div>

							{userInfo.email ? (
								<div
									id="add-commentary-input"
									className="
									w-[308px] 
									border-t border-secondary-dark
									pt-[18px]
									pb-[18px]
									sticky bottom-0
									flex place-items-center
									bg-secondary-light
									h-auto
									gap-2  select-none "
								>
									<img src={usericon} alt="" className="w-9" />
									<div
										className="flex place-items-end
										border border-primary-dark rounded-2xl
										w-[308px] h-auto
										pr-3"
									>
										<textarea
											type="text"
											ref={comentInputRef}
											placeholder="Add comment"
											className={`
											text-sm
											bg-transparent
											h-[38px]  w-full
											px-2 
											py-[8px]
											outline-none 
											resize-none
											overflow-hidden`}
											onChange={(e) => handdleInputChange(e)}
											value={comment}
										/>
										<img
											src={send}
											alt=""
											className="w-7 rotate-45 mb-[6px]"
											onClick={() => handdleSendComment()}
										/>
									</div>
								</div>
							) : (
								<>
									<hr className="h-2" />
								</>
							)}
						</div>
					</div>

					<h2 className="text-primary-dark font-semibold text-xl my-6 select-none">
						Related publications
					</h2>

					<div className="w-screen flex ">
						<div
							id="imageLayout-container"
							className="grow /pr-6 h-full pt-2 overflow-x-hidden overflow-y-auto select-none"
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
						className="absolute top-6 lg:left-10 md:left-5  sm:left-1
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

					<div className="absolute bottom-[-32px]">{linkAlert()}</div>
				</div>
			</>
		);
	};

	/*---------------------------------------------------------------------------
	 *---------------------------------------------------------------------------
	 *---------------------------------------------------------------------------
	 */
	//Mobile
	const dispatch = useDispatch();

	const mobileOpenPub = () => {
		return (
			<>
				<div
					id="page-container"
					ref={refMobile}
					className="w-screen h-[calc(100vh-48px)] overflow-auto overflow-x-hidden flex flex-col place-items-center relative"
				>
					<div className="sticky top-0 z-50 h-0">
						<div
							className={`
								h-fit bg-primary-dark rounded-full
								px-4 py-1
								flex place-content-center place-items-center

								transition-all duration-300
								${alert ? "translate-y-[8px]" : "translate-y-[-30px]"}
								${alert ? "opacity-100" : "opacity-0"}`}
						>
							<p className="text-secondary-light">Link copied</p>
						</div>
					</div>

					<div
						id="publication-info"
						className="w-full h-auto pb-3
						flex place-items-center flex-col gap-[18px] 
						font-inter bg-secondary-light rounded-b-2xl 
						drop-shadow-md"
					>
						<div id="image-container">
							<img
								id="image"
								src={img}
								alt=""
								className={`
							h-auto
							w-screen
                            select-none object-cover`}
							/>
						</div>

						<div
							id="user-info-container"
							className="w-screen px-3 flex flex-col gap-1 "
						>
							<div
								id="user"
								className="
								flex gap-2 place-items-center
								text-md "
							>
								<img onClick={()=> handdleUserClick()} src={usericon} alt="" className="w-8 select-none" />
								<h1>{userName}</h1>
							</div>
							<h1 className="font-semibold text-lg"> {title} </h1>
							<p className="w-[308px] text-sm">{description}</p>
						</div>

						<div id="options" className="flex gap-3 select-none">
							<div
								onClick={() => dispatch(openPublicationsOptions(img))}
								className={`h-8 w-8 rounded-full
								flex place-content-center place-items-center`}
							>
								<img src={threeDots} alt="" className="w-6" />
							</div>

							<div
								onClick={() => {
									dispatch(openShareOptions(shareUrl));
								}}
								className={`h-8 w-8 rounded-full
										flex place-content-center place-items-center`}
							>
								<img src={share} alt="" className="w-6" />
							</div>

							<CopyToClipboard text={shareUrl}>
								<div
									onClick={() => handdleLinkPressed()}
									className={`h-8 w-8 rounded-full
								flex place-content-center place-items-center`}
								>
									<img src={link} alt="" className="w-6" />
								</div>
							</CopyToClipboard>
						</div>

						<div
							onClick={() => dispatch(openListOfComments())}
							id="commentaries-title"
							className="flex place-items-center gap-2 select-none"
						>
							<h1 className="text-[14px] font-semibold">
								{comments.length} Commentaries
							</h1>

							<div
								onClick={() => {}}
								className={`h-[12px] w-[12px] hover:bg-secondary-highlight
									pt-[1px] rounded-full
									flex place-items-center place-content-center`}
							>
								<img src={arrow} alt="" className="" />
							</div>
						</div>
					</div>

					<h2 className="text-primary-dark font-semibold text-sm my-3 select-none">
						Related publications
					</h2>

					<div className="w-screen flex select-none">
						<div
							id="imageLayout-container"
							className="grow /pr-6 h-full overflow-x-hidden overflow-y-auto "
						>
							{layoutHtml.code}
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="block  min-[640px]:hidden">{mobileOpenPub()}</div>
			<div className="hidden min-[640px]:block">{desktopOpenPub()}</div>
		</>
	);
}
