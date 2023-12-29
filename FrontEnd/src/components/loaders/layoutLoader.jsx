import { motion } from "framer-motion";

export const LayoutLoader = () => {
	const inicialOp = 0;
	const numOfCols = window.innerWidth / 240 - ((window.innerWidth / 240) % 1);

	const card = () => {
		const min = 240;
		const max = 448;

		const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
		return (
			<motion.div
				style={{ height: `${random(min, max).toString()}px` }}
				className={`w-[48.5vw] sm:w-[240px] bg-secondary-light rounded-2xl`}
				initial={{ opacity: inicialOp, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.4,
				}}
			/>
		);
	};

	const imagesDesktop = [...Array(numOfCols)].map((_, i) => (
		<div key={i} className="flex flex-col gap-4 mt-2">
			{card()}
			{card()}
			{card()}
			{card()}
			{card()}
			{card()}
			{card()}
			{card()}
		</div>
	));

	const cardMobile = () => {
		const min = 35;
		const max = 100;

		const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

		return (
			<motion.div
				style={{ height: `calc(${random(min, max).toString()}vw)` }}
				className={`w-[48.5vw] sm:w-[240px] bg-secondary-light rounded-2xl`}
				initial={{ opacity: inicialOp, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.4,
				}}
			/>
		);
	};
	const imagesMobile = [...Array(2)].map((_, i) => (
		<div key={i} className="flex flex-col gap-2 mt-2">
			{cardMobile()}
			{cardMobile()}
			{cardMobile()}
			{cardMobile()}
			{cardMobile()}
			{cardMobile()}
			{cardMobile()}
			{cardMobile()}
		</div>
	));

	return (
		<>
			<div className="h-screen w-screen overflow-hidden sm:pr-1">
				<div className="hidden sm:flex h-auto w-auto flex-wrap place-content-center gap-[8px]">
					{imagesDesktop}
				</div>
				<div className="flex sm:hidden h-auto w-full place-content-center gap-[8px]">
					{imagesMobile}
				</div>
			</div>
		</>
	);
};
