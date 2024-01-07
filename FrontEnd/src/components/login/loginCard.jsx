import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import warning from "../../assets/exclamation-triangle.svg";
import { useDispatch } from "react-redux";
import {
	loginAuth,
	logWithGoogleAuth,
} from "../../store/slices/auth/AuthThunks";

import { auth } from "../../firebase/config";

import logo from "../../assets/Logo.svg";

export const LoginCard = () => {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const errors = {
		id: "",
		type: "",
		description: "",
	};

	const [fields, setFields] = useState({
		email: "",
		password: "",
	});

	const [inputErrors, setInputErrors] = useState(errors);

	const dispatch = useDispatch();

	useEffect(() => {
		if (
			email != "" &&
			inputErrors.id == "email" &&
			inputErrors.type == "errorEmpty"
		) {
			errors.type = "";
			setInputErrors(errors);
		}

		if (
			password != "" &&
			inputErrors.id == "password" &&
			inputErrors.type == "errorEmpty"
		) {
			errors.type = "";
			setInputErrors(errors);
		}
	}, [email, password]);

	const validateLogin = () => {
		if (fields.email == "" && password == "") {
			return;
		}

		errors.id = "email";
		if (fields.email == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}

		// const validRegex =
		// 	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		// if (!email.match(validRegex)) {
		// 	console.log("first");
		// 	errors.type = "errorInvalidEmail";
		// 	setInputErrors(errors);
		// 	return;
		// }

		errors.id = "password";
		if (password == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}

		handleSubmit();
	};

	const handleSubmit = async () => {
		try {
			const promise = dispatch(loginAuth(email, password));
			promise.then((value) => {
				//----- mongo ----------
				if (value?.response?.data?.msg) {
					switch (value?.response?.data?.msg) {
						case "Email not found":
							errors.id = "email";
							errors.type = "errorEmailNotFound";
							setInputErrors(errors);
							break;
						case "User not found":
							errors.id = "email";
							errors.type = "errorUserNotFound";
							setInputErrors(errors);
							break;
						case "wrong password":
							errors.id = "password";
							errors.type = "errorInvalid";
							setInputErrors(errors);
							break;
						case "Invalid value":
							errors.id = "password";
							errors.type = "errorInvalid";
							setInputErrors(errors);
							break;
						default:
							break;
					}
				}

				//-----fire base---------
				if (value?.code) {
					switch (value?.code) {
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
							console.log("firebase", auth.currentUser);
							break;
					}
				} else {
					navigate("/home");
				}
			});
		} catch (error) {}
	};

	const handdleGoogleLogin = () => {
		const promise = dispatch(logWithGoogleAuth());
		promise.then((value) => {
			switch (value) {
				case "auth/popup-closed-by-user":
					break;
				case "auth/unauthorized-domain":
					break;
				default:
					navigate("/home");
					break;
			}
		});
	};

	const labelAndError = ({ fieldLabel, fieldInput, fieldType }) => (
		<div
			id="labelAndError"
			className="
			mt-1
			h-fit w-full sm:w-[400px] px-4 sm:px-1
			flex place-items-center
			place-content-between
			text-[2vw] sm:text-[12px]"
		>
			<label
				htmlFor=""
				className={`${fieldInput == "" ? "invisible" : "visible"}`}
			>
				{fieldLabel}
			</label>
			<p
				className={`
					${
						inputErrors.id == fieldType.toLowerCase() &&
						inputErrors.type.startsWith("error")
							? "visible"
							: "invisible"
					}
				bg-secondary-red h-full rounded-t-md
				flex gap-1
				place-items-center
				px-2`}
			>
				<img src={warning} alt="" className="h-[2vw] sm:h-[12px]" />
				Sorry,
				{inputErrors.type == "errorEmpty" ? " empty field" : ""}
				{inputErrors.type == "errorUserNotFound" ? " user not found" : ""}
				{inputErrors.type == "errorEmailNotFound" ? " email not found" : ""}
				{inputErrors.type == "errorInvalid" ? " wrong password" : ""}
			</p>
		</div>
	);

	const loginHtml = () => {
		return (
			<>
				<div
					className="w-screen p-[14px] sm:p-0
					flex flex-col place-items-center sm:place-items-end"
				>
					<div
						id="card1"
						className="
						relative
						w-full  sm:w-[560px] 
						h-auto
						px-10 sm:px-0
						bg-secondary-light
						rounded-2xl
						flex flex-col place-items-center
						font-inter
						text-primary-dark"
					>
						<div
							onClick={() => navigate("/home")}
							className="h-fit w-fit p-4 rounded-full mt-2
						shadow-md hover:shadow-lg hover:translate-y-[-2px]"
						>
							<img src={logo} className="w-[34px] sm:w-[56px] " />
						</div>

						<h1
							id="logo-name"
							className="
							font-semibold 
							text-[7vw] sm:text-[48px]
							text-primary-dark"
						>
							Vintarest
						</h1>

						{labelAndError({
							fieldLabel: "Email / User",
							fieldInput: fields.email,
							fieldType: "email",
						})}
						<input
							id="desktop-email"
							type="text"
							placeholder="Email / User"
							onChange={(e) => {
								setEmail(e.target.value);
								setFields({ ...fields, email: e.target.value });
							}}
							className={`
							px-[14px] sm:px-[16px]
							bg-secondary-light
							border rounded-2xl
							${
								inputErrors.id == "email" &&
								inputErrors.type.startsWith("error")
									? "border-secondary-red"
									: "border-primary-dark"
							}
							outline-none
							h-[34px] w-full sm:h-[48px] sm:w-[432px]
							text-[14px] sm:text-[16px] sm:mb-2
							placeholder:text-secondary-dark`}
						/>

						{labelAndError({
							fieldLabel: "Password",
							fieldInput: fields.password,
							fieldType: "Password",
						})}
						<input
							id="desktop-password-input"
							onChange={(e) => {
								setPassword(e.target.value);
								setFields({ ...fields, password: e.target.value });
							}}
							type="password"
							placeholder="Password"
							className={`
							px-[14px] sm:px-[16px]
							bg-secondary-light
							border rounded-2xl
							${
								inputErrors.id == "password" &&
								inputErrors.type.startsWith("error")
									? "border-secondary-red"
									: "border-primary-dark"
							}
							outline-none
							h-[34px] w-full sm:h-[48px] sm:w-[432px]
							text-[14px] sm:text-[16px]
							placeholder:text-secondary-dark
							mb-[40px]`}
						/>

						<button
							id="login-button"
							onClick={() => validateLogin()}
							className="
							border-[1px]
							text-primary-red
							border-primary-red
							hover:bg-primary-red
							hover:text-secondary-light
							rounded-full
							w-full h-[34px] sm:w-[432px] sm:h-[48px]
							font-semibold
							text-[14px] sm:text-base"
						>
							Log in
						</button>

						<div
							id="o"
							className="
							bg-secondary-light
							h-[12px] w-[12px] sm:h-[14px] sm:w-[14px]
							border-primary-dark border-2 rounded-full
							my-[12px] sm:my-[16px]"
						/>

						<button
							id="google-button"
							className="
							relative
							group
							px-2
							w-full h-[34px] text-[14px] sm:w-[432px] sm:h-[48px] sm:text-base
							bg-secondary-light hover:bg-primary-dark hover:text-secondary-light
							border rounded-full border-primary-dark
							flex place-items-center justify-center
							font-semibold text-center
							mb-4"
							onClick={() => handdleGoogleLogin()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="#4D455D"
								className="h-[16px]  sm:h-[24px]
								group-hover:fill-secondary-light absolute left-3"
								viewBox="0 0 16 16"
							>
								<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
							</svg>
							Log in with Google
						</button>
					</div>

					<div
						id="card2"
						className="
						w-full sm:w-[560px] h-auto px-10 sm:px-0 text-[14px] sm:text-base
						bg-secondary-light
						rounded-2xl
						flex flex-col place-items-center
						font-inter
						text-primary-dark mt-4"
					>
						<button
							id="CreateAccount"
							onClick={() => navigate("/login/register")}
							className="px-4
							w-full h-[34px] sm:w-[432px] sm:h-[48px]
							bg-secondary-light
							border rounded-full border-primary-highlight
							font-semibold text-center text-primary-highlight
							hover:bg-primary-highlight
							hover:text-secondary-light my-4"
						>
							Create account
						</button>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="block">{loginHtml()}</div>
		</>
	);
};
