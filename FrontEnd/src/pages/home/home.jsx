import { lazy, Suspense, useRef } from "react";

//import { ImageLayout } from "../../components/shared/imagelayout";
const ImageLayout = lazy(() => import("../../components/shared/imagelayout"));

//import UserLayout from "../../components/index/userLayout";
const UserLayout = lazy(() => import("../../components/index/userLayout"));

import { ImageContext } from "../../context/imageSelected/imageSelectedContext";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const Home = () => {
	const location = useLocation();
	const words = new URLSearchParams(location.search).get("q");

	const { image } = useContext(ImageContext);

	//const words = useSelector((state) => state.search).words.toLowerCase();
	const [searchFor, setSearchFor] = useState("Explore");

	const divScrollRef = useRef(null);
	const scrollUp = () => {
		divScrollRef.current.scroll({
			top: 0,
		});
	};

	useEffect(() => {
		scrollUp();
	}, [words]);

	return (
		<>
			<div
				className="
				w-screen h-full sm:h-[calc(100vh-48px)]
				flex flex-col place-items-center
				overflow-auto overflow-x-hidden relative"
			>
				{words && (<div className="w-screen flex place-content-center z-50">
					<div
						className="h-[9%] w-screen absolute 
						top-0 left-0 
						backdrop-blur-sm /bg-black"
					/>
					<div
						className={`
						bg-secondary-light
						w-fit h-auto rounded-full
						py-2 px-7
						shadow-md
						absolute top-5 mb-7 z-50 select-none`}
					>
						<div id="explore-profiles" className="flex gap-7 z-50">
							<h1
								onClick={() => setSearchFor("Explore")}
								className={`${
									searchFor == "Explore"
										? "text-primary-dark"
										: "text-secondary-dark"
								}`}
							>
								Explore
							</h1>
							<h1
								onClick={() => setSearchFor("Profiles")}
								className={`${
									searchFor == "Profiles"
										? "text-primary-dark"
										: "text-secondary-dark"
								}`}
							>
								Profiles
							</h1>
						</div>
						<motion.div
							id="line"
							className="h-[4px] w-20 bg-primary-dark
							rounded-full"
							animate={
								searchFor == "Explore"
									? { transform: "translateX(-11px)" }
									: { transform: "translateX(75px)" }
							}
						/>
					</div>
				</div>)}

				<div
					ref={divScrollRef}
					id="images-and-imageSelected"
					className={`
					${words ? (searchFor == "Explore" ? "block pt-[68px]" : "hidden") : "block"}
					w-screen flex gap-2 relative
					h-full overflow-auto overflow-x-hidden `}
				>
					<div id="imageLayout-container" className={`grow h-full pt-2`}>
						<div className={`absolute w-full flex`}>
							<ImageLayout words={words ? words : ""} />

							<div
								className={`
							${image.code.props?.children ? "hidden md:block" : "hidden"}
							invisible h-2 w-[1020px] bg-black
							`}
							></div>
						</div>
					</div>

					<div
						id="image-selected"
						className="h-[calc(100vh-90px)] w-fit mr-2
								rounded-2xl
								hidden md:block
								sticky right-0 top-0 z-50"
					>
						{image.code}
					</div>
				</div>

				{words && (
					<div
						className={`
				${searchFor == "Profiles" ? "block" : "hidden"}
				w-screen h-full pt-[78px] flex place-content-center overflow-auto`}
					>
						<Suspense>
							<UserLayout />
						</Suspense>
					</div>
				)}
			</div>
		</>
	);
};
