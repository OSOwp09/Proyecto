import { motion } from "framer-motion";
import { useState } from "react";
import img11 from "../../assets/imgs/11.jpeg";
import img12 from "../../assets/imgs/12.jpeg";
import img13 from "../../assets/imgs/13.jpeg";

import img21 from "../../assets/imgs/21.jpeg";
import img22 from "../../assets/imgs/22.jpeg";
import img23 from "../../assets/imgs/23.jpeg";

import img31 from "../../assets/imgs/31.jpeg";
import img32 from "../../assets/imgs/32.jpeg";
import img33 from "../../assets/imgs/33.jpeg";

import img41 from "../../assets/imgs/41.jpeg";
import img42 from "../../assets/imgs/42.jpeg";
import img43 from "../../assets/imgs/43.jpeg";

import img51 from "../../assets/imgs/51.jpeg";
import img52 from "../../assets/imgs/52.jpeg";
import img53 from "../../assets/imgs/53.jpeg";

import img61 from "../../assets/imgs/61.jpeg";
import img62 from "../../assets/imgs/62.jpeg";
import img63 from "../../assets/imgs/63.jpeg";

export const LoginBg = () => {
	const [startAnim, setStartAnim] = useState(false);
	const images1 = [img11, img12, img13, img11, img12, img13];

	const images2 = [img21, img22, img23, img21, img22, img23];

	const images3 = [img31, img32, img33, img31, img32, img33];

	const images4 = [img41, img42, img43, img41, img42, img43];

	const images5 = [img51, img52, img53, img51, img52, img53];
	const images6 = [img61, img62, img63, img61, img62, img63];

	document.body.classList.add("overflow-hidden");

	function arr(img) {
		const images = [...Array(img.length)].map((x, i) => (
			<>
				<img
					src={img[i]}
					alt=""
					className="w-[240px] h-auto min-h-[120px]
					rounded-2xl object-cover
					mb-2"
				/>
			</>
		));
		return images;
	}
	const vel = 9999999;

	return (
		<>
			<div className="relative h-[700px] overflow-hidden text-transparent">
				<div className="absolute top-0 left-0">
					<div
						id="container"
						className="
                        w-[1920px] relative"
					>
						<div>
							<div className="absolute top-0 left-[-60px] flex gap-2">
								<motion.div
									initial={{ y: `-${2371 / 2}px` }}
									animate={startAnim ? { y: `0px` } : ""}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images1)}</div>
								</motion.div>

								<motion.div
									initial={{ y: `-${2397 / 2}px` }}
									animate={startAnim ? { y: `0px` } : ""}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images2)}</div>
								</motion.div>

								<motion.div
									initial={{ y: `-${2063 / 2}px` }}
									animate={startAnim ? { y: `0px` } : ""}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images3)}</div>
								</motion.div>

								<motion.div
									className="invisible sm:visible"
									initial={{ y: `-${2066 / 2}px` }}
									animate={startAnim ? { y: `0px` } : ""}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images4)}</div>
								</motion.div>

								<motion.div
									className="invisible md:visible"
									initial={{ y: `-${2344 / 2}px` }}
									animate={startAnim ? { y: `0px` } : ""}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images5)}</div>
								</motion.div>

								<motion.div
									className="invisible lg:visible"
									initial={{ y: `-${2680 / 2}px` }}
									animate={startAnim ? { y: `0px` } : ""}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images6)}</div>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<motion.div
				onHoverStart={() => setStartAnim(true)}
				onHoverEnd={() => setStartAnim(false)}>
				<div
					id="darkOverlay"
					className="absolute top-0 left-0 bg-primary-dark/60 h-[700px] w-screen max-w-[1400px]"
				></div>
			</motion.div>
		</>
	);
};
