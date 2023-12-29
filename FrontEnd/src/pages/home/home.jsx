import { lazy, Suspense } from "react";

//import { ImageLayout } from "../../components/shared/imagelayout";
const ImageLayout = lazy(() => import("../../components/shared/imagelayout"));

//import UserLayout from "../../components/index/userLayout";
const UserLayout = lazy(() => import("../../components/index/userLayout"));

import { ImageContext } from "../../context/imageSelected/imageSelectedContext";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { LayoutLoader } from "../../components/loaders/layoutLoader";

export const Home = () => {
	const { image } = useContext(ImageContext);

	const words = useSelector((state) => state.search).words.toLowerCase();
	const [searchFor, setSearchFor] = useState("Explore");

	const loader = () => {
		return (
			<>
				<div className={"absolute w-full bg-primary-light top-0 left-0 z-50"}>
					<LayoutLoader />
				</div>
			</>
		);
	};

	const [layoutLoaderHtml, setLayoutLoaderHtml] = useState(loader());
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			setTimeout(() => {
				setLoaded(true);
			}, 1600);
			setTimeout(() => {
				//setLoaded(true);
			}, 2600);
		}
	}, [, words]);

	useEffect(() => {
		words == "" ? setSearchFor("Explore") : "";
	}, [, words]);

	return (
		<>
			<div
				className="
				w-screen
				flex flex-col place-items-center
				overflow-y-auto overflow-x-hidden relative"
			>
				<div
					className={`
						${words == "" ? "hidden" : "block"}
						bg-secondary-light
						w-fit h-auto rounded-full
						py-2 px-7
						shadow-md
						sticky top-5 mb-7 z-50 select-none`}
				>
					<div id="explore-profiles" className="flex gap-7">
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

				<div
					id="images-and-imageSelected"
					className={`relative
					h-full overflow-auto overflow-x-hidden
					${searchFor == "Explore" ? "block" : "hidden"}
					w-screen flex gap-2 h-fit `}
				>
					<div id="imageLayout-container" className={`grow h-full pt-2`}>
						{/* <div
							className={`transition-all   ${
								loaded ? "opacity-0" : "opacity-100"
							}`}
						>
							{layoutLoaderHtml}
						</div> */}
						<div className={`absolute w-full flex`}>
							<ImageLayout words={words} />

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
								sticky top-0 z-50"
					>
						{image.code}
					</div>
				</div>

				<div
					className={`
				${searchFor == "Profiles" ? "block" : "hidden"}
				w-screen h-fit flex place-content-center`}
				>
					<Suspense>
						<UserLayout />
					</Suspense>
				</div>
			</div>
		</>
	);
};
