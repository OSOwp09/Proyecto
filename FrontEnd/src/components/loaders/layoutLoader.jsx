import { motion } from "framer-motion";

export const LayoutLoader = () => {
	const inicialOp = 0;
	const numOfCols = (window.innerWidth/240)-  (window.innerWidth/240 % 1)
    
	const images = [...Array(numOfCols)].map((_,i) => (
		<>
			<div 
			key={(numOfCols/(i+1))}
			className="flex flex-col gap-4 mt-2">
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
			<div 
			key={(numOfCols/(i+1))*2}
			className=" flex flex-col gap-4 mt-2">
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
			<div 
			key={(numOfCols/(i+1))*3}
			className=" flex flex-col gap-4 mt-2">
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
				<div
					className="flex h-auto w-auto flex-wrap place-content-center gap-2 pr-[10px] pl-1"
				>
					{images}
				</div>
			</div>
		</>
	);
};
