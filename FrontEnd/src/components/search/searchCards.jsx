import { useParams, useSearchParams } from "react-router-dom";

export const SearchCards = ({ image, text }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<>
			<div
				onClick={() => {
					setSearchParams({ q: text });
					console.log(searchParams);
				}}
				className="w-[48vw] h-[20vw] bg-secondary-dark rounded-2xl relative 
				flex place-items-center place-content-center overflow-hidden drop-shadow-md"
			>
				<img
					src={image}
					alt=""
					className="h-full w-full absolute object-cover"
				/>

				<div className="h-full w-full bg-primary-dark opacity-60 absolute top-0 rounded-2xl" />

				<div className="w-full flex place-content-center place-items-center px-3">
					<p className="text-center text-secondary-light h-full w-full z-50 break-words">
						{text}
					</p>
				</div>
			</div>
		</>
	);
};
