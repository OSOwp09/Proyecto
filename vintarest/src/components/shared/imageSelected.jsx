import { ImageLayout } from "./imagelayout";
import { Commentary } from "./comentary";
import { ImageContext } from "../../context/imageSelectedContext";

import closeX from "../../assets/x-circle.svg";
import threeDots from "../../assets/three-dots.svg";
import share from "../../assets/box-arrow-up.svg";
import link from "../../assets/link-45deg.svg";
import usericon from "../../assets/person-circle.svg";
import heart from "../../assets/heart-fill-red.svg";
import arrow from "../../assets/arrow.svg";

import { useContext } from "react";

export const ImageSelected = ({ close, src }) => {
	const { image } = useContext(ImageContext);
	//const { imgSelected, handleImageSelected } = useSelectImage(<></>);

	const coment = [...Array(10)].map((x, i) => (
		<div className="my-2">
			<Commentary user={"user"} coment={"muy lindo"} heart={heart} />
		</div>
	));

	return (
		<>
			<div className="pt-2 pb-2 h-full">
				<div
					id="container"
					className="bg-secondary-light
					h-full
					w-[520px] overflow-auto
					rounded-2xl
					drop-shadow-xl
					font-inter text-primary-dark "
				>
					<div
						id="options"
						className="p-2 flex place-items-center gap-3 select-none"
					>
						<img onClick={() => close()} src={closeX} alt="" className="h-8" />
						<img src={threeDots} alt="" className="w-7" />
						<img src={share} alt="" className="w-7" />
						<img src={link} alt="" className="w-7" />
					</div>
					<div
						id="image-and-comentaries"
						className="flex gap-4 h-auto max-h-[448px] px-2"
					>
						<div id="image" className="select-none">
							<img
								src={image.src}
								alt=""
								className="
								w-[240px] h-auto max-h-[448px] min-h-[120px]
								rounded-2xl object-cover "
							/>
						</div>
						<div id="user-and-commentaries" className="">
							<div
								id="user"
								className="
								flex gap-2 place-items-center
								text-2xl"
							>
								<img src={usericon} alt="" className="w-12 select-none" />
								<h1>User</h1>
							</div>
							<div
								id="commentaries-title"
								className="flex gap-4 mt-6 mb-4 select-none"
							>
								<h1 className="text-base font-semibold">3 Commentaries</h1>
								<img src={arrow} alt="" className="pt-1" />
							</div>
							<div id="commentaries" className=" max-h-[274px] overflow-auto">
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
					<div id="more-images" className="mr-4 mt-4">
						<ImageLayout />
					</div>
					
				</div>
			</div>
		</>
	);
};
