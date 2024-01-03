import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { SearchCards } from "../../components/search/searchCards";

import send from "../../assets/send.svg";
import searhIcon from "../../assets/search.svg";

const ImageLayout = lazy(() => import("../../components/shared/imagelayout"));
const UserLayout = lazy(() => import("../../components/index/userLayout"));

import imageTest from "../../assets/imgs/11.jpeg";

import { useSearchParams } from "react-router-dom";

export default function SearcPage() {
	const [isMyInputFocused, setIsMyInputFocused] = useState(false);
	const [newSearch, setNewSearch] = useState(null);
	const textAreaRef = useRef(null);
	const [searchFor, setSearchFor] = useState("Explore");

	const [searchParams, setSearchParams] = useSearchParams();

	const divScrollPublicationsRef = useRef(null);
	const divScrollProfilesRef = useRef(null);
	const scrollUp = () => {
		divScrollPublicationsRef?.current?.scroll({
			top: 0,
		});
		divScrollProfilesRef?.current?.scroll({
			top: 0,
		});
	};

	useEffect(() => {
		scrollUp();
	}, [searchParams]);

	const cards = () => {
		const arrayOfCards = [...Array(4)].map((_, i) => (
			<div
				onClick={() => setSearchParams({ q: "tattoo" })}
				key={i}
				className=""
			>
				<SearchCards image={imageTest} text={"tattoo"} />
			</div>
		));

		return arrayOfCards;
	};

	const handdleInputChange = (e) => {
		setNewSearch(e.target.value);
	};

	const handdleSearchSubmit = () => {
		console.log(newSearch);
		var searchWords = newSearch;
		if (newSearch.split(" ").slice(-1)[0] == "") {
			searchWords = newSearch.replace(/.$/, "");
		}
		setSearchParams({ q: searchWords });
		setNewSearch("");
		setIsMyInputFocused(false);
		textAreaRef.current.blur();
	};

	return (
		<>
			<div
				className={`${isMyInputFocused ? "h-screen" : "h-full"}  w-screen 
			/bg-secondary-light
			flex flex-col place-content-between`}
			>
				<div />

				<div
					id="dark-overlay"
					className={`${isMyInputFocused ? "block" : "hidden"} 
					absolute top-0 left-0 bg-primary-dark/60 h-screen w-full backdrop-blur-sm z-20`}
				/>

				{!searchParams.get("q") && (
					<div className="w-screen h-auto flex flex-wrap place-items-center place-content-center gap-2  z-0">
						{cards()}
					</div>
				)}

				{searchParams.get("q") && (
					<div className="w-screen h-full relative">
						<div
							className="sticky top-0 p-3 z-10 select-none 
							w-screen flex place-content-center"
						>
							<div
								className="h-[calc(100%+8px)] w-screen absolute top-[-5px] left-0 z-0
							backdrop-blur-sm "
							/>

							<div
								className={`
								bg-secondary-light
								w-fit h-auto rounded-full
								py-2 px-7
								shadow-md z-50`}
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
						</div>

						<div
							ref={divScrollPublicationsRef}
							className={`${searchFor == "Explore" ? "block " : "hidden"}
							absolute left-0 top-0 pt-[68px]
							h-full overflow-auto`}
						>
							<div className="h-full w-screen">
								<Suspense>
									<ImageLayout words={searchParams.get("q")} />
								</Suspense>
							</div>
						</div>

						<div
							ref={divScrollProfilesRef}
							className={`${searchFor == "Profiles" ? "block" : "hidden"}
							absolute top-0 pt-[68px]
							h-full overflow-auto`}
						>
							<Suspense>
								<UserLayout />
							</Suspense>
						</div>
					</div>
				)}

				<div
					id="search-input"
					onBlur={() => setIsMyInputFocused(false)}
					onFocus={() => setIsMyInputFocused(true)}
					className={`
					${isMyInputFocused ? "rounded-t-2xl " : ""}
					w-full h-fit bg-secondary-light 
					flex gap-2 place-items-center px-2 pt-2
					z-50`}
				>
					<div
						className="
						relative
						border border-primary-dark rounded-2xl 
						h-auto w-full py-1 text-base 
						flex pl-2"
					>
						<img src={searhIcon} alt="" />

						<input
							ref={textAreaRef}
							type="text"
							value={newSearch ? newSearch : ""}
							onKeyDown={(e) => (e.key == "Enter" ? handdleSearchSubmit() : "")}
							onChange={(e) => handdleInputChange(e)}
							placeholder="Search"
							className={`first-line:marker:text-base bg-transparent 
							w-full 
							h-[24px] max-h-[120px]
							pl-2 
							outline-none resize-none`}
						/>
					</div>

					<div
						className={`${
							newSearch != null && newSearch != "" ? "block" : "hidden"
						} border border-primary-dark rounded-full flex place-content-center place-items-center p-1`}
					>
						<motion.div
							onClick={() => {
								textAreaRef.current.focus();
								handdleSearchSubmit();
							}}
							whileTap={{ scale: 0.9 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
							className="h-6 w-6 pr-0.5"
						>
							<img src={send} alt="" className="h-full rotate-45" />
						</motion.div>
					</div>
				</div>
			</div>
		</>
	);
}
