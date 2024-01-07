import logo from "../src/assets/Logo.svg";
export default function MaintenanceCard() {
	return (
		<>
			<div className="font-inter overflow-hidden w-screen h-[100dvh] bg-primary-light ">
				<div
					className="font-extrabold w-[100dvw] h-[100dvh]
				flex place-items-center place-content-center p-6"
				>
					<div
						className="flex flex-col gap-7 place-items-center place-content-center 
						rounded-2xl shadow-md p-6"
					>
						<img className="h-[88px]" src={logo} alt="" />
						<div className="flex flex-col gap-2 place-items-center place-content-center ">
							<h1 className="text-[22px] sm:w-[50%] text-center leading-7">
								Website is currently under maintenance.
							</h1>
							<h2 className="text-[12px] w-[50%] text-center">
								We'll be back soon
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}