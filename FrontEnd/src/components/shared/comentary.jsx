import { useEffect } from "react";
import usericon from "../../assets/person-circle.svg";

export const Commentary = ({ user, coment, date }) => {
	const currentDate = new Date();
	const commentDate = new Date(date);

	const yearsDifference = currentDate.getFullYear() - commentDate.getFullYear();
	const monthsDifference = currentDate.getMonth() - commentDate.getMonth();
	const daysDifference = currentDate.getDate() - commentDate.getDate();
	const hoursDifference = currentDate.getHours() - commentDate.getHours();
	const minutesDifference = currentDate.getMinutes() - commentDate.getMinutes();
	const secondsDifference = currentDate.getSeconds() - commentDate.getSeconds();

	const differenceArray = [
		daysDifference,
		hoursDifference,
		minutesDifference,
		secondsDifference,
	];

	const shortDateTexts = ["d", "h", "m", "s"];

	const timeDifference = () => {
		if (monthsDifference == 0 && yearsDifference == 0) {
			/*
				---------------------------------------------
			Set text to 1 second for commentes inmediatly submited
			*/
			if (
				daysDifference == 0 &&
				hoursDifference == 0 &&
				hoursDifference == 0 &&
				minutesDifference == 0 &&
				secondsDifference == 0
			) {
				return "1s";
			}
			//		-----------------------

			for (let i = 0; i < shortDateTexts.length; i++) {
				if (differenceArray[i] != 0) {
					return `${differenceArray[i]}${shortDateTexts[i]}`;
				}
			}
		}

		const commentYear = commentDate.getFullYear();
		const commentMonth = commentDate.getMonth();
		const commentDay = commentDate.getDate();

		return `${commentDay}/${commentMonth}/${commentYear}`;
	};

	return (
		<>
			<div
				className="font-inter text-sm
			text-primary-dark gap-2 flex "
			>
				<img
					src={usericon}
					alt=""
					className="w-[32px] pt-[1px] place-self-start select-none "
				/>
				<div className="w-full place-self-start ">
					<h1 className="font-normal">
						<b>{user}</b> {timeDifference()}
					</h1>
					<p className="font-normal">{coment}</p>
				</div>
			</div>
		</>
	);
};
