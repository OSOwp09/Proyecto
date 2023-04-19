import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
	loginAuth,
	logoutAuth,
	logWithGoogleAuth,
} from "../../store/slices/auth/Thunks";
import { login, logout, authSlice } from "../../store/slices/auth/AuthSlice";
import { auth } from "../../firebase/config";

import logo from "../../assets/Logo.svg";
import googleLogo from "../../assets/google.svg";
import facbookLogo from "../../assets/facebook.svg";

export const LoginCard = () => {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [inputErrors, setInputErrors] = useState("");
	const dispatch = useDispatch();

	const errors = {
		id: "",
		type: "",
	};

	const validateLogin = () => {
		errors.id = "email";
		if (email == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}

		errors.id = "password";
		if (password == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}

		handleSubmit();
	};

	const handleSubmit = () => {
		const promise = dispatch(loginAuth(email, password));
		promise.then((value) => {
			switch (value) {
				case "auth/wrong-password":
					errors.id = "password";
					errors.type = "errorInvalid";
					setInputErrors(errors);
					break;
				case "auth/user-not-found":
					errors.id = "email";
					errors.type = "errorInvalid";
					setInputErrors(errors);
					break;
				default:
					console.log(auth.currentUser);
					navigate("/home");
					break;
			}
			
		});
	};

	return (
		<>
			<div
				id="card1"
				className="
					relative
                    w-[560px] h-auto
                    bg-secondary-light
                    rounded-2xl
                    flex flex-col place-items-center
                    font-inter
                    text-primary-dark"
			>
				<img
					src={logo}
					className="
					w-[56px] h-[56px]
					mt-6"
				/>

				<h1
					id="logo-name"
					className="
					
                        font-semibold
                        text-[48px]
                        text-primary-dark mb-[12px]"
				>
					Vintarest
				</h1>
				<div
					id="email-labelAndError"
					className="
					self-start ml-[80px]
					h-5 w-[400px]
					flex place-items-center
					place-content-between
					text-xs"
				>
					<label
						htmlFor=""
						className={`${email == "" ? "invisible" : "visible"}`}
					>
						Email
					</label>
					<p
						className={`
						${
							inputErrors.id == "email" && inputErrors.type.startsWith("error")
								? "visible"
								: "invisible"
						}
					bg-secondary-red h-full rounded-t-md
					flex gap-1 
					place-items-center
					px-2`}
					>
						<img
							src="src/assets/exclamation-triangle.svg"
							alt=""
							className="h-3"
						/>
						Sorry,
						{inputErrors.type == "errorEmpty" ? " empty field" : ""}
						{inputErrors.type == "errorInvalid" ? " email not found" : ""}
					</p>
				</div>
				<input
					id="email"
					type="text"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						${
							inputErrors.id == "email" && inputErrors.type.startsWith("error")
								? "border-secondary-red"
								: "border-primary-dark"
						}
						outline-none
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-2`}
				/>
				<div
					id="password-labelAndError"
					className="
					self-start ml-[80px]
					h-5 w-[400px]
					flex place-items-center
					place-content-between
					text-xs"
				>
					<label
						htmlFor=""
						className={`${password == "" ? "invisible" : "visible"}`}
					>
						Password
					</label>
					<p
						className={`
						${
							inputErrors.id == "password" &&
							inputErrors.type.startsWith("error")
								? "visible"
								: "invisible"
						}
					bg-secondary-red h-full rounded-t-md
					flex gap-1 
					place-items-center
					px-2`}
					>
						<img
							src="src/assets/exclamation-triangle.svg"
							alt=""
							className="h-3"
						/>
						Sorry,
						{inputErrors.type == "errorEmpty" ? " empty field" : ""}
						{inputErrors.type == "errorInvalid" ? " wrong password" : ""}
					</p>
				</div>

				<input
					id="password-input"
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					className={`
                        px-[16px]
                        bg-secondary-light
						border rounded-2xl
						${
							inputErrors.id == "password" &&
							inputErrors.type.startsWith("error")
								? "border-secondary-red"
								: "border-primary-dark"
						}
                        outline-none
						h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-[40px]`}
				/>
				<button
					onClick={() => validateLogin()}
					className="
                        bg-primary-red
                        rounded-full
                        w-[432px] h-[48px]
                        font-semibold text-secondary-light
                        "
				>
					Log in
				</button>
				<div
					id="o"
					className="
                        bg-secondary-light
                        h-[14px] w-[14px]
                        border-primary-dark border-2 rounded-full
                        my-[16px]"
				/>
				<button
					className="
                        px-4
                        w-[432px] h-[48px]
                        bg-secondary-light
                        border rounded-full border-primary-dark
                        flex place-items-center
                        font-semibold text-center"
				>
					<img
						className="w-[24px] mr-[90px]"
						src={facbookLogo}
						alt="facebook"
					/>
					Log in with Facebook
				</button>
				<button
					className="
                        px-4
                        w-[432px] h-[48px]
                        bg-secondary-light
                        border rounded-full border-primary-dark
                        flex place-items-center
                        font-semibold text-center
                        my-4"
				>
					<img className="w-[24px] mr-[100px]" src={googleLogo} alt="google" />
					Log in with Google
				</button>
			</div>
			<div
				id="card2"
				className="
                    w-[560px] h-auto
                    bg-secondary-light
                    rounded-2xl
                    flex flex-col place-items-center
                    font-inter
                    text-primary-dark
                    mt-4"
			>
				<button
					id="CreateAccount"
					onClick={() => navigate("/login/register")}
					className="px-4
                        w-[432px] h-[48px]
                        bg-secondary-light
                        border rounded-full border-primary-highlight
                        font-semibold text-center text-primary-highlight
                        my-4
                        "
				>
					Create account
				</button>
			</div>
		</>
	);
};
