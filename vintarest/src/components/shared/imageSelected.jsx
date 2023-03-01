import { ImageCard } from "./imagecard";
import { ImageLayout } from "./imagelayout";
import { Commentary } from "./comentary";

export const ImageSelected = () => {
    
    const coment = [...Array(10  )].map((x, i) => (
        <div className="my-2">
            < Commentary user={"user"} coment={"muy lindo"} heart={"src/assets/heart-fill-red.svg"} />
        </div>
    ));
	const image =
		"https://i.pinimg.com/474x/22/58/5f/22585f1c269b30cf64406f78993c9eb4.jpg";

	return (
		<>
			<div className="w-auto h-screen py-4 ">
				<div
					id="container"
					className="bg-secondary-light
                max-h-full w-[520px] overflow-auto
                
                rounded-2xl
                drop-shadow-xl
                ml-4 mr-2
                font-inter text-primary-dark"
				>
					<div id="options" className="p-2 flex place-items-center gap-3">
						<img src="src/assets/x-circle.svg" alt="" className="h-8" />
						<img src="src/assets/three-dots.svg" alt="" className="w-7" />
						<img src="src/assets/box-arrow-up.svg" alt="" className="w-7" />
						<img src="src/assets/link-45deg.svg" alt="" className="w-7" />
					</div>
					<div
						id="image-and-comentaries"
						className="flex gap-4 h-auto max-h-[448px] px-2"
					>
						<div id="image" className="">
							<img
								src={image}
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
								<img
									src="src/assets/person-circle.svg"
									alt=""
									className="w-12"
								/>
								<h1>User</h1>
							</div>
							<div id="commentaries-title" className="flex gap-4 mt-6 mb-4">
								<h1 className="text-base font-semibold">3 Commentaries</h1>
								<img src="src/assets/arrow.svg" alt="" className="pt-1" />
							</div>
							<div id="commentaries" className=" max-h-[274px] overflow-auto">
                                <div>
                                    {coment}
                                </div>
							</div>
							<div id="add-commentary-input" className="flex gap-2 mt-3">
								<img
									src="src/assets/person-circle.svg"
									alt=""
									className="w-12"
								/>
								<input
									type="text"
									placeholder="Add comment"
									className="
                            bg-secondary-light
                            h-12 w-[176px]
                            px-2
                            border border-primary-dark rounded-2xl"
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
