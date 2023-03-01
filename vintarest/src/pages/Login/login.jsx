import { LoginBg } from "../../components/login/loginBg";
import { LoginCard } from "../../components/login/loginCard";
export const Login = () => {
	return (
		<>
			<div className="relative h-screen w-screen">
				<div className="">
					<LoginBg />
				</div>
				<div className="absolute top-0 left-0 bg-primary-dark/60 h-screen w-screen"></div>
				<div className="absolute top-1 right-6">
					<LoginCard />
				</div>
			</div>
		</>
	);
};
