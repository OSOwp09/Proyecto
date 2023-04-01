import usericon from "../../assets/person-circle.svg";

export const Commentary = ({ user, coment, heart }) => {
	return (
		<>
			<div className="font-inter text-primary-dark gap-2 flex">
				<img src={usericon} alt="" className="w-[32px] place-self-start select-none" />
				<div className="w-auto max-w-[196px] place-self-start">
					<h1 className="text-sm">
						{<b>{user}</b>} {coment}
					</h1>
					<div></div>
					<div className="flex place-items-center gap-2">
						<p className="text-xs select-none">1mo</p>
						<img src={heart} alt="" className="w-3 select-none" />
					</div>
				</div>
			</div>
		</>
	);
};
