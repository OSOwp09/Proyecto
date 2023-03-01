import { motion } from "framer-motion";

export const LoginBg = () => {
	const images1 = [
		"https://i.pinimg.com/474x/bf/03/5e/bf035ea8a81953b94d1ae8bf73346516.jpg",
		"https://i.pinimg.com/474x/e7/7b/c1/e77bc1d8d58d99f01fb36a61186e6f18.jpg",
		"https://i.pinimg.com/474x/22/58/5f/22585f1c269b30cf64406f78993c9eb4.jpg",

		"https://i.pinimg.com/474x/bf/03/5e/bf035ea8a81953b94d1ae8bf73346516.jpg",
		"https://i.pinimg.com/474x/e7/7b/c1/e77bc1d8d58d99f01fb36a61186e6f18.jpg",
		"https://i.pinimg.com/474x/22/58/5f/22585f1c269b30cf64406f78993c9eb4.jpg",
	];

	const images2 = [
		"https://i.pinimg.com/474x/27/31/31/2731317928b14b44ccdd7b9ea0deaa31.jpg",
		"https://i.pinimg.com/474x/e0/5c/86/e05c8696f2806b3b0da67e1678eb53e0.jpg",
		"https://i.pinimg.com/474x/96/b2/51/96b251cb1c4b5d15bf974b2f263b2670.jpg",

		"https://i.pinimg.com/474x/27/31/31/2731317928b14b44ccdd7b9ea0deaa31.jpg",
		"https://i.pinimg.com/474x/e0/5c/86/e05c8696f2806b3b0da67e1678eb53e0.jpg",
		"https://i.pinimg.com/474x/96/b2/51/96b251cb1c4b5d15bf974b2f263b2670.jpg",
	];

	const images3 = [
		"https://i.pinimg.com/474x/e9/9f/6c/e99f6c6bcfb53c7a9dfd5cf995de70f1.jpg",
		"https://i.pinimg.com/474x/86/2f/11/862f111b85b3eba472d8690074faf638.jpg",
		"https://i.pinimg.com/474x/95/83/79/958379a29f14efe14e080633ace91ccb.jpg",

		"https://i.pinimg.com/474x/e9/9f/6c/e99f6c6bcfb53c7a9dfd5cf995de70f1.jpg",
		"https://i.pinimg.com/474x/86/2f/11/862f111b85b3eba472d8690074faf638.jpg",
		"https://i.pinimg.com/474x/95/83/79/958379a29f14efe14e080633ace91ccb.jpg",
	];

	const images4 = [
		"https://i.pinimg.com/474x/69/29/0b/69290be224b3d45809cf3e433c083f90.jpg",
		"https://i.pinimg.com/474x/73/fe/55/73fe5587a8c4bf730e9a3f2ef7c3c2a3.jpg",
		"https://i.pinimg.com/474x/a3/1e/82/a31e823d51f8a6ef6e755a8e92073101.jpg",

		"https://i.pinimg.com/474x/69/29/0b/69290be224b3d45809cf3e433c083f90.jpg",
		"https://i.pinimg.com/474x/73/fe/55/73fe5587a8c4bf730e9a3f2ef7c3c2a3.jpg",
		"https://i.pinimg.com/474x/a3/1e/82/a31e823d51f8a6ef6e755a8e92073101.jpg",
	];

	const images5 = [
		"https://i.pinimg.com/474x/25/09/01/250901af3a4cd49cd552058f767221af.jpg",
		"https://i.pinimg.com/474x/57/cd/7a/57cd7a6175f96cbc95414b08052156d5.jpg",
		"https://i.pinimg.com/474x/88/16/c1/8816c13301c81066bc8384b76e14e331.jpg",

		"https://i.pinimg.com/474x/25/09/01/250901af3a4cd49cd552058f767221af.jpg",
		"https://i.pinimg.com/474x/57/cd/7a/57cd7a6175f96cbc95414b08052156d5.jpg",
		"https://i.pinimg.com/474x/88/16/c1/8816c13301c81066bc8384b76e14e331.jpg",
	];

	const images6 = [
		"https://i.pinimg.com/474x/01/c2/81/01c281f493247895ed6f67cc0adc4a4a.jpg",
		"https://i.pinimg.com/474x/de/e4/0d/dee40d1067635703d8fdfd84a91ffaa0.jpg",
		"https://i.pinimg.com/474x/33/b9/37/33b937a699460b37764bf39733aa2147.jpg",

		"https://i.pinimg.com/474x/01/c2/81/01c281f493247895ed6f67cc0adc4a4a.jpg",
		"https://i.pinimg.com/474x/de/e4/0d/dee40d1067635703d8fdfd84a91ffaa0.jpg",
		"https://i.pinimg.com/474x/33/b9/37/33b937a699460b37764bf39733aa2147.jpg",

	];

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
	const vel = 60
	return (
		<>
			<div className="relative h-[800px] overflow-hidden text-transparent">
				<div className="absolute top-0 left-0">
					<div
						id="container"
						className="
                        w-[1920px] relative"
					>
						<div>
							<div
								className="absolute top-0 left-[-60px] flex gap-2"
							>
								<motion.div
									initial={{ y: `-${2371/2}px` }}
									animate={{ y: `0px` }}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images1)}</div>
								</motion.div>

								<motion.div
									initial={{ y: `-${2397/2}px` }}
									animate={{ y: `0px` }}
									transition={{
										duration: vel,
										ease: "linear",
										repeat: Infinity,
									}}
								>
									<div className="">{arr(images2)}</div>
								</motion.div>
								
								<motion.div
									initial={{ y: `-${2063/2}px` }}
									animate={{ y: `0px` }}
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
									initial={{ y: `-${2066/2}px` }}
									animate={{ y: `0px` }}
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
									initial={{ y: `-${2344/2}px` }}
									animate={{ y: `0px` }}
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
									initial={{ y: `-${2680/2}px` }}
									animate={{ y: `0px` }}
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

				{/* <div className="absolute top-0 left-0">
					<motion.div
						initial={{ x: "-120px" }}
						//animate={{ y: "820px" }}
						transition={{
							duration: 30,
							ease: "linear",
							repeat: Infinity,
						}}
					>
						<div
							id="container"
							className="
                        flex gap-2 w-[1920px] relative"
						>
							<div className="">{images1}</div>
							<div className="">{images2}</div>
							<div className="">{images1}</div>
							<div className="invisible sm:visible">{images1}</div>
							<div className="invisible md:visible">{images1}</div>
							<div className="invisible lg:visible">{images1}</div>
							<div className="invisible xl:visible">{images1}</div>
							<div className="invisible 2xl:visible">{images1}</div>
						</div>
					</motion.div>
				</div>

				<div className="absolute top-0 left-0">
					<motion.div
						initial={{ y: "-820px", x: "-120px" }}
						//animate={{ y: "0px" }}
						transition={{
							duration: 30,
							repeat: Infinity,
							ease: "linear",
						}}
					>
						<div
							id="container"
							className="
                        flex gap-2 w-[1920px] relative"
						>
							<div className="">{images1}</div>
							<div className="relative">{images2}</div>
							<div className="">{images1}</div>
							<div className="invisible sm:visible">{images1}</div>
							<div className="invisible md:visible">{images1}</div>
							<div className="invisible lg:visible">{images1}</div>
							<div className="invisible xl:visible">{images1}</div>
							<div className="invisible 2xl:visible">{images1}</div>
						</div>
					</motion.div>
				</div> */}
			</div>
		</>
	);
};
