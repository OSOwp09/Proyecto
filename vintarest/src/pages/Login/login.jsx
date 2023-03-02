import { useState } from "react";
import { LoginBg } from "../../components/login/loginBg";
import { LoginCard } from "../../components/login/loginCard";
import { RegisterCard } from "../../components/login/registerCard";

export const Login = () => {

	const [cardBool, setCardBool] = useState(true)

	function toggleBool(){
		setCardBool(!cardBool)
	}

	const card = cardBool ? <LoginCard /> : <RegisterCard />

	return (
		
		<>
			<div className="relative h-screen w-screen">
				<div className="">
					<LoginBg />
				</div>
				<div className="absolute top-0 left-0 bg-primary-dark/60 h-screen w-screen"></div>
				<div className="absolute top-1 right-6">
					{/* <LoginCard /> */}
					{card}
				</div>
			</div>
		</>
	);
};
