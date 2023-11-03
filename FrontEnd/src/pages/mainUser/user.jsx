import { UserCard } from "../../components/userPage/userCard";
import { ImageLayout } from "../../components/shared/imagelayout";
import { ImageContext } from "../../context/imageSelectedContext";
import { motion } from "framer-motion";

import add from "../../assets/plus-circle 1.svg";
import share from "../../assets/Group 98.svg";
import link from "../../assets/Group 99.svg";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShareButton } from "../../components/shared/publicationOptions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";

export default function User  () {
	const navigate = useNavigate();
	const [shareVisibility, setShareVisibility] = useState(false);
	const user = useSelector((state) => state.auth?.user);
	const shareUrl = `${window.location.host}/home/${user}`;
	const email = useSelector((state) => state.auth.email);

	const { image } = useContext(ImageContext);

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
				${alert ? "translate-y-[-36px]" : "translate-y-[opx]"}`}
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
		}, 1500);
	};

	return (
		<>
			<div className="flex place-content-center w-screen h-auto">
				<div
					id="imageLayout-container"
					className="grow pr-6 h-auto pt-2 overflow-x-hidden overflow-y-auto "
				>
					<div
						className="
                        mb-3 
                        flex place-content-center gap-2
                        flex-col-reverse
                        place-items-center"
					>
						<div id="options" className="flex gap-2 relative">
							<img
								onClick={() => navigate("/home/upload")}
								src={add}
								alt=""
								className="hover:bg-secondary-light rounded-full"
							/>
							<img
								onClick={() => setShareVisibility(!shareVisibility)}
								src={share}
								alt=""
								className="hover:bg-secondary-light rounded-full"
							/>
							<CopyToClipboard text={shareUrl}>
								<img
									onClick={() => handdleLinkPressed()}
									src={link}
									alt=""
									className="hover:bg-secondary-light rounded-full"
								/>
							</CopyToClipboard>

							<motion.div
								className={`
								${shareVisibility ? "block" : "hidden"}
								absolute 
								left-[-117%] top-[8px] z-50`}
								style={{ scale: 0.8 }}
							>
								<ShareButton src={shareUrl} />
							</motion.div>
						</div>

						<UserCard />
					</div>
					<ImageLayout uid={email} words={"-"} />
				</div>
				<div className="mt-2">{image.code}</div>
				<div className="absolute bottom-[-32px]">{linkAlert()}</div>
			</div>
		</>
	);
};
