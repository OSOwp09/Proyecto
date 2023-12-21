import { Navigate, useNavigate } from "react-router-dom";
import BgImageMobil from "../../assets/movilLoginbg.webp";
import BgImageDesktop from "../../assets/loginBgImg.webp";

import errorImg from "../../assets/imgs/error404.jpg";
import usericon from "../../assets/person-circle.svg";
import { useEffect } from "react";

export default function Error() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/Error404");
	}, []);

	return (
		<>
			<div className="w-screen h-screen flex place-content-center place-items-center relative overflow-hidden">
				<div className="absolute top-0 left-0 z-0 grid content-center justify-center
						h-screen overflow-hidden">
					<img
						src={BgImageMobil}
						alt=""
						className="block sm:hidden object-cover w-screen h-screen"
					/>
					<img
						src={BgImageDesktop}
						alt=""
						className="hidden sm:block object-cover h-screen w-screen"
					/>
					<div
						id="darkOverlay"
						className="absolute top-0 left-0 bg-primary-dark/60 h-full w-full backdrop-blur-sm"
					></div>
				</div>

				<div
					className={`w-[531px] h-[632px] 
					rounded-2xl
					flex flex-col place-content-center place-items-center
					gap-2 z-50`}
				>
					
					<div
						id="imgcontainer"
						className="
                        bg-secondary-light
                        h-auto w-[240px] rounded-2xl
                        mx-2 mb-2
                        font-inter text-[14px] text-primary-dark break-inside-avoid
                        drop-shadow"
					>
						<img
							src={errorImg}
							alt=""
							className="w-[240px] h-auto max-h-[448px] min-h-[120px]
                            rounded-t-2xl object-fit
                            mb-2 select-none"
						/>
						<div id="description-container" className="p-1">
							<h1
								id="description"
								className="h-[14px] w-[240px] font-semibold flex place-items-center"
							>
								Whoops... page not found
							</h1>
							<div
								id="user"
								className="h-[32px] flex place-items-center gap-1 mt-1"
							>
								<img src={usericon} alt="" className="h-[32px] select-none" />
								<h1>Error404</h1>
								<h1></h1>
							</div>
						</div>
					</div>
					<div>
						<button
							onClick={() => navigate("/home")}
							className="w-[240px] 
							bg-primary-red 
							text-secondary-light
							py-4 font-semibold 
							rounded-2xl z-50"
						>
							Go Home
						</button>
					</div>
					
				</div>
			</div>
		</>
	);
}
