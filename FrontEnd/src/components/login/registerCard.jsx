import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/config";
import { register } from "../../store/slices/auth/AuthSlice";
import { registerAuth } from "../../store/slices/auth/AuthThunks";

import { CreateUserApi } from "../../api/Api";

import logo from "../../assets/Logo.svg";
import warning from "../../assets/exclamation-triangle.svg";

export const RegisterCard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [fields, setFields] = useState({
		name: "",
		user: "",
		email: "",
		password: "",
		confirmation: "",
	});

	const [inputErrors, setInputErrors] = useState("");

	const errors = {
		id: "",
		type: "",
		description: "",
	};

	useEffect(() => {
		if (fields[inputErrors.id] != "" && inputErrors.type == "errorEmpty") {
			errors.type = "";
			setInputErrors(errors);
		}
	}, [fields]);

	const handleInput = () => {
		//----- Name ----------
		errors.id = "name";
		if (fields.name == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (fields.name.length < 3 || fields.name.length > 25) {
			errors.type = "errorInvalid";
			errors.description = " Name must have betwen 3 and 25 characters";
			setInputErrors(errors);
			return;
		}
		//----- User ----------
		errors.id = "user";
		if (fields.user == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (fields.user.length < 3 || fields.user.length > 15) {
			errors.type = "errorInvalid";
			errors.description = " user must have betwen 3 and 15 characters";
			setInputErrors(errors);
			return;
		}

		//----- Email ----------
		const validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		errors.id = "email";

		if (fields.email == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (!fields.email.match(validRegex)) {
			errors.type = "errorInvalid";
			errors.description = " invalid email";
			setInputErrors(errors);
			return;
		}

		//----- Password ----------
		errors.id = "password";
		const lowerCaseLetters = /[a-z]/g;
		const upperCaseLetters = /[A-Z]/g;
		const numbers = /[0-9]/g;

		if (fields.password == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (!fields.password.match(lowerCaseLetters)) {
			errors.type = "errorInvalid";
			errors.description = " must have at least one lowercase letter";
			setInputErrors(errors);
			return;
		}
		if (!fields.password.match(upperCaseLetters)) {
			errors.type = "errorInvalid";
			errors.description = " must have at least one uppercase letter";
			setInputErrors(errors);
			return;
		}
		if (!fields.password.match(numbers)) {
			errors.type = "errorInvalid";
			errors.description = " must have at least one number";
			setInputErrors(errors);
			return;
		}
		if (fields.password.length < 8) {
			errors.type = "errorInvalid";
			errors.description = " must have at least 8 caracteres";
			setInputErrors(errors);
			return;
		}

		//----- Confirmation ----------
		errors.id = "confirm password";
		if (fields.confirmation == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (fields.confirmation != fields.password) {
			errors.type = "errorInvalid";
			errors.description = " passwords don't match";
			setInputErrors(errors);
			return;
		}

		onSubmit(fields.email, fields.password, fields.name, fields.user);
	};

	const onSubmit = async (email, password, name, user) => {
		try {
			const resp = await CreateUserApi.post("", {
				name: name,
				user: user,
				email: email,
				password: password,
				photoURL: "",
				hashtags: "",
			});

			const promise = dispatch(registerAuth(email, password, name, user));

			promise.then((result) => {
				navigate("/");
			});
		} catch (error) {
			console.log(error);
			switch (error?.response?.data?.msg) {
				case "Email already in use":
					errors.id = "email";
					errors.type = "errorInvalid";
					errors.description = " email already in use";
					setInputErrors(errors);
					break;
				case "User already in use":
					errors.id = "user";
					errors.type = "errorInvalid";
					errors.description = " user already in use";
					setInputErrors(errors);
					break;

				default:
					break;
			}
		}
	};

	const labelAndError = ({ fieldLabel, fieldInput }) => (
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
						inputErrors.id == fieldLabel.toLowerCase() &&
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
				{inputErrors.type == "errorInvalid" ? inputErrors.description : ""}
				{inputErrors.type == "errorIsInUse" ? inputErrors.description : ""}
			</p>
		</div>
	);

	const handdleUserChange = (e) => {
		if (!e.includes(" ")) {
			setFields({ ...fields, user: e });
		}
	};

	//desktop
	const desktopRegister = () => {
		return (
			<>
				<div
					id="card1"
					className="
                        w-[560px] h-auto
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
						h-[48px] mb-2
                        font-semibold
                        text-[48px]
                        text-primary-dark"
					>
						Vintarest
					</h1>
					{labelAndError({ fieldLabel: "Name", fieldInput: fields.name })}
					<input
						id="desktop-name"
						type="text"
						placeholder="Name"
						onChange={(e) => setFields({ ...fields, name: e.target.value })}
						className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						${
							inputErrors.id == "name" && inputErrors.type.startsWith("error")
								? "border-secondary-red"
								: "border-primary-dark"
						}
						outline-none
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-1`}
					/>
					{labelAndError({ fieldLabel: "User", fieldInput: fields.user })}
					<input
						id="desktop-user"
						type="text"
						placeholder="User"
						onChange={(e) => handdleUserChange(e.target.value)}
						value={fields.user}
						className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						${
							inputErrors.id == "user" && inputErrors.type.startsWith("error")
								? "border-secondary-red"
								: "border-primary-dark"
						}
						outline-none
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-1`}
					/>
					{labelAndError({ fieldLabel: "Email", fieldInput: fields.email })}
					<input
						id="desktop-email"
						type="text"
						placeholder="Email"
						value={fields.email}
						onChange={(e) =>
							setFields({ ...fields, email: e.target.value.toLowerCase() })
						}
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
                        mb-1`}
					/>
					{labelAndError({
						fieldLabel: "Password",
						fieldInput: fields.password,
					})}
					<input
						id="desktop-password"
						type="password"
						placeholder="Password"
						onChange={(e) => setFields({ ...fields, password: e.target.value })}
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
                        mb-1`}
					/>
					{labelAndError({
						fieldLabel: "Confirm Password",
						fieldInput: fields.confirmation,
					})}
					<input
						id="desktop-confirm-password"
						type="password"
						placeholder="Confirm password"
						onChange={(e) =>
							setFields({ ...fields, confirmation: e.target.value })
						}
						className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						${
							inputErrors.id == "confirm password" &&
							inputErrors.type.startsWith("error")
								? "border-secondary-red"
								: "border-primary-dark"
						}
						outline-none
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-6`}
					/>
					<button
						onClick={() => handleInput()}
						id="Register-btn"
						className="
						border-[1px]
						text-primary-red
						border-primary-red
                        hover:bg-primary-red
						hover:text-secondary-light
                        rounded-full
                        w-[432px] h-[48px]
                        font-semibold 
                        mb-6"
					>
						Register
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
						onClick={() => navigate("/login")}
						className="px-4
                        w-[432px] h-[48px]
                        bg-secondary-light
                        border rounded-full border-primary-highlight
                        font-semibold text-center text-primary-highlight
                        my-4
						hover:bg-primary-highlight
						hover:text-secondary-light
                        "
					>
						Login
					</button>
				</div>
			</>
		);
	};

	//Mobile
	const mobileRegister = () => {
		return (
			<>
				<div
					className="w-screen p-[14px]
				flex flex-col place-items-center"
				>
					<div
						id="card1"
						className="
						relative
						w-full h-auto
						px-10 py-4
						bg-secondary-light
						rounded-2xl
						flex flex-col place-items-center
						font-inter
						text-primary-dark"
					>
						<div
							onClick={() => navigate("/home")}
							className="h-fit w-fit p-4 rounded-full
							shadow-md hover:shadow-lg hover:translate-y-[-2px]"
						>
							<img src={logo} className="w-[34px] sm:w-[56px] " />
						</div>
						<h1
							id="logo-name"
							className="
							font-semibold
							text-[3em] 
							text-primary-dark mb-[8px]"
						>
							Vintarest
						</h1>
						{labelAndError({ fieldLabel: "Name", fieldInput: fields.name })}
						<input
							id="name"
							type="text"
							placeholder="Name"
							onChange={(e) => setFields({ ...fields, name: e.target.value })}
							className={`
							px-[14px]
							bg-secondary-light
							border rounded-2xl
							${
								inputErrors.id == "name" && inputErrors.type.startsWith("error")
									? "border-secondary-red"
									: "border-primary-dark"
							}
							outline-none
							h-[34px] w-full
							text-[14px]
							placeholder:text-secondary-dark`}
						/>
						{labelAndError({ fieldLabel: "User", fieldInput: fields.user })}
						<input
							id="user"
							type="text"
							placeholder="User"
							onChange={(e) => handdleUserChange(e.target.value)}
							value={fields.user}
							className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						${
							inputErrors.id == "user" && inputErrors.type.startsWith("error")
								? "border-secondary-red"
								: "border-primary-dark"
						}
						outline-none
							h-[34px] w-full
							text-[14px]
							placeholder:text-secondary-dark`}
						/>
						{labelAndError({ fieldLabel: "Email", fieldInput: fields.email })}
						<input
							id="email"
							type="text"
							placeholder="Email"
							value={fields.email}
							onChange={(e) =>
								setFields({ ...fields, email: e.target.value.toLowerCase() })
							}
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
							h-[34px] w-full
							text-[14px]
							placeholder:text-secondary-dark`}
						/>
						{labelAndError({
							fieldLabel: "Password",
							fieldInput: fields.password,
						})}
						<input
							id="password"
							type="password"
							placeholder="Password"
							onChange={(e) =>
								setFields({ ...fields, password: e.target.value })
							}
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
							h-[34px] w-full
							text-[14px]
							placeholder:text-secondary-dark`}
						/>
						{labelAndError({
							fieldLabel: "Confirm Password",
							fieldInput: fields.confirmation,
						})}
						<input
							id="confirm-password"
							type="password"
							placeholder="Confirm password"
							onChange={(e) =>
								setFields({ ...fields, confirmation: e.target.value })
							}
							className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						${
							inputErrors.id == "confirm password" &&
							inputErrors.type.startsWith("error")
								? "border-secondary-red"
								: "border-primary-dark"
						}
						outline-none
							h-[34px] w-full
							text-[14px]
							placeholder:text-secondary-dark`}
						/>
						<button
							onClick={() => handleInput()}
							id="Register-btn"
							className="
							border-[1px]
							text-primary-red
							border-primary-red
							hover:bg-primary-red
							hover:text-secondary-light
							rounded-full
							w-full h-[34px]
							font-semibold
							text-[14px] mt-4"
						>
							Register
						</button>
					</div>
					<div
						id="card2"
						className="
                        relative mt-4
						w-full h-auto
						px-10 py-3
						bg-secondary-light
						rounded-2xl
						flex flex-col place-items-center
						font-inter
						text-primary-dark"
					>
						<button
							onClick={() => navigate("/login")}
							className="px-4
                        w-full h-[36px]
                        bg-secondary-light
                        border rounded-full border-primary-highlight
                        font-semibold text-center text-primary-highlight
						hover:bg-primary-highlight
						hover:text-secondary-light
                        "
						>
							Login
						</button>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="block sm:hidden">{mobileRegister()}</div>
			<div className="hidden sm:block">{desktopRegister()}</div>
		</>
	);
};
