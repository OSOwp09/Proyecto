import {
	EmailShareButton,
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookMessengerShareButton,
} from "react-share";

import {
	EmailIcon,
	FacebookIcon,
	FacebookMessengerIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";

import usericon from "../../assets/person-circle.svg";

import copyLink from "../../assets/link-45deg.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import { closeShareOptions } from "../../store/slices/shareOptions/shareOptionsThunks";
import { closePublicationsOptions } from "../../store/slices/publicationsOptions/publicationsOptionsThunk";
import { closeListOfComments } from "../../store/slices/commentsList/commentsListThunk";

export const ShareButton = (src) => {
	const shareUrl = src.src;
	return (
		<>
			<div className="pt-2">
				<div
					id="Share"
					className="
					h-fit w-[384px] bg-secondary-light
					pb-3
					rounded-2xl shadow-[0px_0px_10px_-2px_rgba(0,0,0,0.25)]
					flex flex-col place-items-center relative"
				>
					<h1 className="my-3 font-semibold text-sm">Share</h1>
					<div id="buttons" className="text-xs flex gap-5 flex-wrap ml-5">
						<WhatsappShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<WhatsappIcon size={48} className="rounded-full" />
							</motion.div>
							<h2>Whatsapp</h2>
						</WhatsappShareButton>

						<FacebookShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<FacebookIcon size={48} className="rounded-full" />
							</motion.div>
							<h2>Facebook</h2>
						</FacebookShareButton>

						<TwitterShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<TwitterIcon size={48} className="rounded-full" />
							</motion.div>
							<h2>Twitter</h2>
						</TwitterShareButton>

						<TelegramShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<TelegramIcon size={48} className="rounded-full" />
							</motion.div>
							<h2>Telegram</h2>
						</TelegramShareButton>

						<EmailShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<EmailIcon size={48} className="rounded-full" />
							</motion.div>
							<h2>Email</h2>
						</EmailShareButton>

						<CopyToClipboard text={shareUrl}>
							<button className="flex flex-col gap-1 place-items-center">
								<motion.div
									whileTap={{ scale: 0.9 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									<div className="bg-secondary-highlight h-12 w-12 rounded-full flex place-content-center place-items-center">
										<img src={copyLink} alt="" className="h-8" />
									</div>
								</motion.div>
								<h2 className="text-center">Copy link</h2>
							</button>
						</CopyToClipboard>
					</div>
				</div>
			</div>
		</>
	);
};

export const MobileShareButton = () => {
	const shareOptions = useSelector((state) => state.shareOptions);
	const shareUrl = shareOptions.code;
	const dispatch = useDispatch();
	return (
		<>
			<div className="w-screen h-full flex flex-col justify-end">
				<div
					onClick={() => dispatch(closeShareOptions())}
					id="darkOverlay"
					className="absolute top-0 left-0 bg-primary-dark/60 h-full w-full backdrop-blur-sm"
				></div>

				<div
					id="Share"
					className="
						h-fit w-screen bg-secondary-light
						pb-3
						rounded-2xl shadow-[0px_0px_10px_-2px_rgba(0,0,0,0.25)]
						flex flex-col gap-3 pt-3 place-items-center relative"
				>
					<h1 className="ml-4 font-semibold text-sm">Share</h1>
					<div
						id="buttons"
						className="text-xs flex place-items-center justify-center gap-5 flex-wrap px-3"
					>
						<WhatsappShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<WhatsappIcon size={44} className="rounded-full" />
							</motion.div>
							<h2>Whatsapp</h2>
						</WhatsappShareButton>

						<FacebookShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<FacebookIcon size={44} className="rounded-full" />
							</motion.div>
							<h2>Facebook</h2>
						</FacebookShareButton>

						<TwitterShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<TwitterIcon size={44} className="rounded-full" />
							</motion.div>
							<h2>Twitter</h2>
						</TwitterShareButton>

						<TelegramShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<TelegramIcon size={44} className="rounded-full" />
							</motion.div>
							<h2>Telegram</h2>
						</TelegramShareButton>

						<EmailShareButton
							url={shareUrl}
							className="flex flex-col gap-1 place-items-center"
						>
							<motion.div
								whileTap={{ scale: 0.9 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<EmailIcon size={44} className="rounded-full" />
							</motion.div>
							<h2>Email</h2>
						</EmailShareButton>

						<CopyToClipboard text={shareUrl}>
							<button className="flex flex-col gap-1 place-items-center">
								<motion.div
									whileTap={{ scale: 0.9 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									<div className="bg-secondary-highlight h-12 w-12 rounded-full flex place-content-center place-items-center">
										<img src={copyLink} alt="" className="h-8" />
									</div>
								</motion.div>
								<h2 className="text-center">Copy link</h2>
							</button>
						</CopyToClipboard>
					</div>
					<div onClick={() => dispatch(closeShareOptions())}>
						<button className="font-semibold font-inter text-primary-dark  bg-secondary-light rounded-2xl py-3 px-4 drop-shadow-md">
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export const ThreeDots = (src) => {
	const download = async () => {
		const image = await fetch(src.src);

		const duplicateName = "image";

		const imageBlog = await image.blob();
		const imageURL = URL.createObjectURL(imageBlog);
		const link = document.createElement("a");
		link.href = imageURL;
		link.download = "" + duplicateName + "";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const openTab = () => {
		window.open(src.src, "_blank");
	};

	return (
		<>
			<div className="pt-2">
				<div
					className="h-[78px] w-[159px] bg-secondary-light
                py-2 px-2
                rounded-2xl shadow-[0px_0px_10px_-2px_rgba(0,0,0,0.25)]
                flex flex-col place-content-between
                font-semibold text-sm"
				>
					<button
						onClick={() => download()}
						className="text-left px-2 py-1 hover:bg-secondary-highlight rounded-md"
					>
						Download image
					</button>
					<button
						onClick={() => openTab()}
						className="text-left px-2 py-1 hover:bg-secondary-highlight rounded-md"
					>
						Open image
					</button>
				</div>
			</div>
		</>
	);
};

export const MobileThreeDots = () => {
	const publicationsOptions = useSelector((state) => state.publicationsOptions);
	const src = publicationsOptions.code;

	const dispatch = useDispatch();

	const download = async () => {
		const image = await fetch(src);

		const duplicateName = "image";

		const imageBlog = await image.blob();
		const imageURL = URL.createObjectURL(imageBlog);
		const link = document.createElement("a");
		link.href = imageURL;
		link.download = "" + duplicateName + "";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const openTab = () => {
		window.open(src, "_blank");
	};

	return (
		<>
			<div className="w-screen h-full	 flex flex-col justify-end">
				<div
					onClick={() => dispatch(closePublicationsOptions())}
					id="darkOverlay"
					className="absolute top-0 left-0 bg-primary-dark/60 h-full w-full backdrop-blur-sm"
				></div>

				<div
					className="h-auto w-screen bg-secondary-light
					py-3 px-3
					rounded-t-2xl
					flex flex-col place-content-between place-items-center
					font-semibold text-sm z-50"
				>
					<div className="w-full flex flex-col gap-2">
						<button
							onClick={() => download()}
							className="w-full text-left px-2 py-1 "
						>
							Download image
						</button>
						<button
							onClick={() => openTab()}
							className="w-full text-left px-2 py-1 "
						>
							Open image
						</button>
					</div>
					<div onClick={() => dispatch(closePublicationsOptions())}>
						<button className="font-semibold font-inter text-primary-dark  bg-secondary-light rounded-2xl py-3 px-4 drop-shadow-md">
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

import closeX from "../../assets/x-circle.svg";
import { CreateCommentApi } from "../../api/Api";
import { useEffect, useState } from "react";
import { Commentary } from "../shared/comentary";

export const MobileCommentList = () => {
	const dispatch = useDispatch();

	const commentsList = useSelector((state) => state.commentsList);
	const [commentsHtml, setCommentsHtml] = useState([]);

	const userInfo = useSelector((state) => state.auth);
	const [token, setToken] = useState("");
	const [userId, serUserId] = useState("");

	useEffect(() => {
		setToken(userInfo.token);
		serUserId(userInfo.uid);

		try {
			const commentsHtml = [...Array(commentsList.listOfComments.length)].map(
				(x, i) => (
					<div key={i} className="my-2">
						<Commentary
							user={commentsList.listOfComments[i].userId.user}
							coment={commentsList.listOfComments[i].text}
							date={commentsList.listOfComments[i].date}
						/>
					</div>
				)
			);

			setCommentsHtml(commentsHtml);
		} catch (error) {}
	}, [, userInfo, commentsList]);

	const [publishCommentHtml, setPublishCommentHtml] = useState(false);

	const [comment, setComment] = useState("");
	const id = `${window.location}`.split("/").slice(-1)[0];

	const maxCommentLength = 162;
	const handdleInputChange = (e) => {
		const text = e.target.value;
		if (text.length <= maxCommentLength) {
			setComment(text);
		}
	};

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

					const newComment = (
						<div className="my-2" key={commentsHtml.length}>
							<Commentary
								user={userInfo.user}
								coment={comment}
								date={currentDate}
							/>
						</div>
					);

					setComment("");

					const arr = commentsHtml;

					arr.unshift(newComment);

					setCommentsHtml(arr);
					setPublishCommentHtml(false);
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	return (
		<>
			<div className="w-screen h-full flex flex-col justify-end">
				<div
					onClick={() => dispatch(closeListOfComments())}
					id="darkOverlay"
					className="absolute top-0 left-0 bg-primary-dark/60 h-full w-full backdrop-blur-sm"
				></div>

				<div
					className="h-[80vh] w-screen bg-secondary-light
					py-3 px-3
					rounded-t-2xl
					flex flex-col place-content-between place-items-center
					font-semibold text-sm z-50 "
				>
					<div id="comments-containter" className="w-full">
						<h2 className="w-full text-center select-none">
							{commentsHtml.length} Commentaries
						</h2>
						<div>{commentsHtml}</div>
					</div>

					{userInfo.email ? (
						<div
							id="add-commentary-input"
							className={`${
								publishCommentHtml ? "w-screen" : "w-full"
							}  flex gap-2 place-content-between place-items-center select-none`}
						>
							<img
								src={usericon}
								alt=""
								className={`${!publishCommentHtml ? "block" : "hidden"} w-9`}
							/>

							<div
								className={`${
									publishCommentHtml
										? "absolute bottom-0 h-auto w-full py-2 rounded-t-2xl bg-secondary-light z-50 px-2 flex flex-col gap-3"
										: "flex place-items-end border border-primary-dark rounded-2xl w-full h-auto pr-3"
								}  z-50`}
							>
								<div
									className={`${
										publishCommentHtml ? "block" : "hidden"
									} w-full flex place-content-center relative`}
								>
									<img
										onClick={() => setPublishCommentHtml(false)}
										className="absolute left-0 top-[3px]"
										src={closeX}
										alt=""
									/>
									<h1 className="font-semibold text-[14px]">Add a comment</h1>
								</div>
								<textarea
									onClick={() => setPublishCommentHtml(true)}
									onMouseDown={() => setPublishCommentHtml(true)}
									type="text"
									placeholder={`${
										publishCommentHtml ? "Share something nice" : "Add comment"
									}`}
									onChange={(e) => handdleInputChange(e)}
									value={publishCommentHtml ? comment:""}
									className={`
											${
												publishCommentHtml
													? " h-[100px] overflow-auto "
													: " h-[32px] px-2 py-[6px] overflow-hidden text-center"
											}
											text-sm w-full bg-transparent outline-none resize-none`}
								/>
								<div
									className={`${
										publishCommentHtml ? "block" : "hidden"
									} w-full flex place-content-end`}
								>
									<button
										onClick={() => {handdleSendComment(), setPublishCommentHtml(false)}}
										className="w-auto h-auto bg-primary-highlight py-2 px-2 text-[14px] font-semibold text-secondary-light rounded-2xl"
									>
										Publish
									</button>
								</div>
							</div>
							<button
								onClick={() => dispatch(closeListOfComments())}
								className={`${
									!publishCommentHtml ? "block" : "hidden"
								} font-semibold font-inter text-primary-dark  bg-secondary-light rounded-2xl py-3 px-4 drop-shadow-md `}
							>
								Close
							</button>

							<div
								onClick={() => setPublishCommentHtml(false)}
								id="darkOverlay"
								className={`${
									publishCommentHtml ? "block" : "hidden"
								} absolute top-0 left-0 bg-primary-dark/60 h-full w-full backdrop-blur-sm`}
							></div>
						</div>
					) : (
						<div className="w-full flex place-content-center place-items-center">
							<button
								onClick={() => dispatch(closeListOfComments())}
								className="font-semibold font-inter text-primary-dark  bg-secondary-light rounded-2xl py-3 px-4 drop-shadow-md "
							>
								Close
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
