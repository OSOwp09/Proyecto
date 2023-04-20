import { UserCard } from "../../components/userPage/userCard";
import { ImageLayout } from "../../components/shared/imagelayout";
import { ImageContext } from "../../context/imageSelectedContext";
import { motion } from "framer-motion";

import add from "../../assets/plus-circle 1.svg";
import share from "../../assets/Group 98.svg";
import link from "../../assets/Group 99.svg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShareButton } from "../../components/shared/publicationOptions";

export const User = () => {
	const navigate = useNavigate()
	const [shareVisibility, setShareVisibility] = useState(false)

    const {image} = useContext(ImageContext)
	return (
		<>
			<div className="flex place-content-center w-screen h-screen">
				<div
					id="imageLayout-container"
					className="grow pr-6 h-full pt-2 overflow-x-hidden overflow-y-auto 
                    "
				>
					<div
						className="
                        mb-3
                        relative flex place-content-center gap-2
                        max-[1100px]:flex-col-reverse
                        max-[1100px]:place-items-center"
					>	
						<div className="min-[1100px]:absolute bottom-0 left-6 flex gap-2">
							<img
								onClick={()=>navigate("/home/upload")}
								src={add}
								alt=""
								className="hover:bg-secondary-light rounded-full"
							/>
							<img
								onClick={()=>setShareVisibility(!shareVisibility)}
								src={share}
								alt=""
								className="hover:bg-secondary-light rounded-full"
							/>
							<img
								src={link}
								alt=""
								className="hover:bg-secondary-light rounded-full"
							/>
						</div>
						<motion.div 
						className={`
						${shareVisibility ? "block":"hidden"}
						absolute 
						top-[238px]
						min-[1100px]:left-[-15px] min-[1100px]:top-[-20px] z-50
						`}
						style={{scale:0.8}}>
							<ShareButton/>
						</motion.div>
						<UserCard />
					</div>
					<ImageLayout/>
				</div>
				{image.code}
			</div>
		</>
	);
};
