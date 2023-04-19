import { useNavigate } from "react-router-dom";
import boxArrow from "../../assets/file-arrow-up-fill.svg";
import userIcon from "../../assets/person-circle.svg";
import plusICon from "../../assets/plus-circle 1.svg";
import closeIcon from "../../assets/x-circle.svg";
//import { ReactComponent as PlusICon } from "../../assets/plus-circle 1.svg";

export const UploadPhoto = () => {
	const navigate = useNavigate();
	return (
		<>
			<div
				className="
                select-none
                h-screem w-screen
                flex place-content-center place-items-center"
			>
				<div
					id="container"
					className="
                    relative
                    h-[496px] w-[512px]
                    bg-secondary-light
                    rounded-2xl
                    shadow-lg
                    flex"
				>
					<img
						id="close"
                        onClick={()=> navigate("/home/user")}
						className="
                        absolute right-2 top-2
                        h-6"
						src={closeIcon}
						alt=""
					/>
					<div
						id="photoContainer"
						className="
                        w-[240px] h-[448px]
                        bg-secondary-highlight
                        rounded-2xl
                        m-6
                        flex"
					>
						<div
							id="photoArea"
							className="
                            w-full
                            rounded-2xl
                            border border-primary-highlight border-dashed
                            m-6 
                            flex place-content-center place-items-center"
						>
							<div
								id="dashedOutline"
								className="
                                flex flex-col gap-6
                                font-semibold
                                text-primary-highlight"
							>
								<img className="h-8" src={boxArrow} alt="" />
								<div className="flex flex-col place-items-center">
									<h1>Drag and drop</h1>
									<h1>or</h1>
									<h1>Click to upload</h1>
								</div>
							</div>
						</div>
					</div>
					<div
						id="inputsContainer"
						className="
                        w-auto max-w-[200px] 
                        my-6 mr-6
                        font-semibold
                        relative"
					>
						<input
							id="Title"
							className="
                            bg-transparent
                            mt-6 outline-none text-2xl"
							type="text"
							placeholder="Add Title"
						/>
						<hr className="h-[2px] w-[198px] bg-primary-dark border-0" />
						<div className="flex gap-3 mt-6 place-items-center">
							<img className="h-12" src={userIcon} alt="" />
							<h1 className="text-2xl">User</h1>
						</div>
						<input
							id="Description"
							className="
                            bg-transparent
                            mt-6 outline-none text-sm"
							type="text"
							placeholder="Add Description"
						/>
						<hr className="h-[2px] w-[198px] bg-primary-dark border-0" />
						<input
							id="Hashtags"
							className="
                            bg-transparent
                            mt-6 outline-none text-xs"
							type="text"
							placeholder="Add Hashtags"
						/>
						<hr className="h-[2px] w-[198px] bg-primary-dark border-0" />
						<button
							className="
                            px-2
                            text-2xl text-primary-highlight
                            border-2 border-primary-highlight
                            hover:bg-primary-highlight
                            hover:text-secondary-light
                            rounded-2xl
                            absolute bottom-0 right-0
                            flex gap-2"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
