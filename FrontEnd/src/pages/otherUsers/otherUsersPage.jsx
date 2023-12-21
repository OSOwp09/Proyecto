import { UserCard } from "../../components/otherUser/otherUserCard";
import { ImageLayout } from "../../components/shared/imagelayout";
import { ImageContext } from "../../context/imageSelected/imageSelectedContext";
import { motion } from "framer-motion";

import share from "../../assets/Group 98.svg";
import link from "../../assets/Group 99.svg";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ShareButton } from "../../components/shared/publicationOptions";
import { useSelector } from "react-redux";
import { FindUserByUser } from "../../api/Api";

export  default function OtherUsersPage () {
	const navigate = useNavigate();
	const [shareVisibility, setShareVisibility] = useState(false);
	const shareUrl = `${window.location}`;

	const { image } = useContext(ImageContext);

	return (
		<>
			<div className="flex place-content-center w-screen h-auto">
				<div
					id="imageLayout-container"
					className="grow pr-6 h-full pt-2 overflow-x-hidden overflow-y-auto "
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
								onClick={() => setShareVisibility(!shareVisibility)}
								src={share}
								alt=""
								className="hover:bg-secondary-light rounded-full"
							/>
							<CopyToClipboard text={shareUrl}>
								<img
									src={link}
									alt=""
									className="hover:bg-secondary-light rounded-full"
								/>
							</CopyToClipboard>
							<motion.div
								className={`
								${shareVisibility ? "block" : "hidden"}
								absolute 
								left-[-214%] top-[8px] z-50`}
								style={{ scale: 0.8 }}
							>
								<ShareButton />
							</motion.div>
						</div>

						<UserCard />
					</div>
					<ImageLayout uid={shareUrl.split("/").slice(-1)} />
				</div>
				<div className="mt-2">{image.code}</div>
			</div>
		</>
	);
};
