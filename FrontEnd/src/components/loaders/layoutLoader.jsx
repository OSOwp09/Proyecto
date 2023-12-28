import { motion } from "framer-motion";

export const LayoutLoader = () => {
	const inicialOp = 0;
	const numOfCols = window.innerWidth / 240 - ((window.innerWidth / 240) % 1);

	const min = 240;
	const max = 448;

	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

	const images = [...Array(numOfCols)].map((_, i) => (
		<div key={i}>
			<div className="flex flex-col gap-4 mt-2">
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={` w-[240px] bg-secondary-light rounded-2xl`}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.4,
					}}
				></motion.div>
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				></motion.div>
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded{-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				></motion.div>
			</div>
			<div className=" flex flex-col gap-4 mt-2">
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				></motion.div>
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				></motion.div>
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				></motion.div>
			</div>
			<div className=" flex flex-col gap-4 mt-2">
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				></motion.div>
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				></motion.div>
				<motion.div
					style={{ height: `${random(min, max).toString()}px` }}
					className={"w-[240px] bg-secondary-light rounded-2xl"}
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				></motion.div>
			</div>
		</div>
	));

	return (
		<>
			<div className="h-screen w-screen overflow-hidden">
				<div className="flex h-auto w-auto flex-wrap place-content-center gap-2 pr-[10px] pl-1">
					{images}
				</div>
			</div>
		</>
	);
};
