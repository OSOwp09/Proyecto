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

import copyLink from "../../assets/link-45deg.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion } from "framer-motion";

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

export const ThreeDots = (src) => {
	
	const download = async () => {
		const image = await fetch(src.src);

		//Split image name
		//const nameSplit = originalImage.split("/");

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
