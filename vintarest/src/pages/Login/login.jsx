import { LoginBg } from "../../components/login/loginBg";
import { LoginCard } from "../../components/login/loginCard";
import { RegisterCard } from "../../components/login/registerCard";
import { Routes, Route } from "react-router-dom";

import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate()
	console.log(auth.currentUser);
	
	return (
		<>
			<div className="h-screen w-screen
			grid justify-center content-center ">
				<div
					className="
				overflow-hidden
				min-[1401px]:rounded-2xl
				drop-shadow-md
				relative h-screen w-screen 
				max-h-[800px] max-w-[1400px]
				select-none"
				>
					<div id="background" className="">
						<LoginBg />
					</div>
					<div id="LoginCard" className="absolute top-[1%] right-6">
						<Routes>
							<Route path="/" element={<LoginCard />} />
							<Route path="/login" element={<LoginCard />} />
							<Route path="/register" element={<RegisterCard />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
};
