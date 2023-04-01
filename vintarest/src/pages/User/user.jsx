import { UserCard } from "../../components/userPage/userCard";
import { ImageLayout } from "../../components/shared/imagelayout";
import { ImageContext } from "../../context/imageSelectedContext";

import add from "../../assets/plus-circle 1.svg";
import share from "../../assets/Group 57share.svg";
import link from "../../assets/Group 58link_user.svg";
import { useContext } from "react";

export const User = () => {
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
								src={add}
								alt=""
								className="bg-secondary-light rounded-full"
							/>
							<img
								src={share}
								alt=""
								className="bg-secondary-light rounded-full"
							/>
							<img
								src={link}
								alt=""
								className="bg-secondary-light rounded-full"
							/>
						</div>
						<UserCard />
					</div>
					<ImageLayout/>
				</div>
				{image.code}
			</div>
		</>
	);
};
