import { motion } from "framer-motion";

export const UserInfoLoader = () => {
	return (
		<>
			<motion.svg
				className="
				animate-pulse
					bg-secondary-highlight rounded-full
					h-[120px] w-[120px] select-none
					mb-1"
			/>
			<motion.svg
				className="
				animate-pulse
				bg-secondary-highlight  rounded-full
					h-[30px] w-[150px]
					my-3"
			/>
			<motion.svg
				className="
				animate-pulse
				bg-secondary-highlight  rounded-full
					h-[16px] w-[100px]"
			/>
		</>
	);
};
