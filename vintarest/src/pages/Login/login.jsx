import { useState } from "react";
import { LoginBg } from "../../components/login/loginBg";
import { LoginCard } from "../../components/login/loginCard";
import { RegisterCard } from "../../components/login/registerCard";
import { Error } from "../ErrorPage/error";
import { Routes, Route } from "react-router-dom";

export const Login = () => {
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
					<div id="LoginCard" className="absolute top-[3%] right-6">
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
