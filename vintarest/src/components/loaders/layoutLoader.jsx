import { motion } from "framer-motion";

export const LayoutLoader = () => {
	const inicialOp = 0;
    
	const images = [...Array((( window.innerWidth/240)-  (window.innerWidth/240 % 1)))].map(() => (
		<>
			<div className="flex flex-col gap-4 mt-2">
				<motion.div
					className=" h-[340px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.4,
					}}
				></motion.div>
				<motion.div
					className=" h-[248px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				></motion.div>
				<motion.div
					className=" h-[408px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				></motion.div>
			</div>
			<div className=" flex flex-col gap-4 mt-2">
				<motion.div
					className=" h-[240px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				></motion.div>
				<motion.div
					className=" h-[308px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				></motion.div>
				<motion.div
					className=" h-[448px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				></motion.div>
			</div>
			<div className=" flex flex-col gap-4 mt-2">
				<motion.div
					className=" h-[300px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				></motion.div>
				<motion.div
					className=" h-[368px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				></motion.div>
				<motion.div
					className=" h-[328px] w-[240px] bg-secondary-light rounded-2xl"
					initial={{ opacity: inicialOp, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				></motion.div>
			</div>
		</>
	));

	return (
		<>
			<div className="h-screen w-screen overflow-hidden">
				<motion.div
					className="flex h-auto w-auto flex-wrap place-content-between pr-8 pl-1 "
					initial={{ opacity: 1 }}
					animate={{ opacity: 0 }}
					transition={{ delay: 1 }}
				>
					{images}
				</motion.div>
			</div>
		</>
	);
};
