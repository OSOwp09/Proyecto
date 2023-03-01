import React from "react";

export const ImageCard = ({ image, description, userName }) => {
	return (
		<>
			<div
				id="container"
				className="
                
                bg-secondary-light
                h-full w-[240px] rounded-2xl
                mx-2 mb-2
                font-inter text-[14px] text-primary-dark break-inside-avoid
                hover:drop-shadow-md"
			> 
				<img
					src={image}
					alt=""
					className="w-[240px] h-auto max-h-[448px] min-h-[120px]
                        rounded-2xl object-cover
                        mb-2"
				/>
				<div id="description-container" className="p-1">
					<h1
						id="description"
						className="h-[14px] w-[240px] font-semibold flex place-items-center"
					>
						{description}
					</h1>
					<div
						id="user"
						className="h-[32px] flex place-items-center gap-1 mt-1"
					>
						<img
							src="src/assets/person-circle.svg"
							alt=""
							className="h-[32px]"
						/>
						<h1>{userName}</h1>
					</div>
				</div>
			</div>
		</>
	);
};
