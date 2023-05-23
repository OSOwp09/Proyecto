import { Login } from "../pages/Login/login";
import { LoginCard } from "../components/login/loginCard";
import { RegisterCard } from "../components/login/registerCard";
import { Error } from "../pages/ErrorPage/error";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
                    <Route path="/login" element={<LoginCard />} />
					<Route path="/register" element={<RegisterCard />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</Router>
		</>
	);
};
