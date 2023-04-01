import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/Logo.svg"
import warning from "../../assets/exclamation-triangle.svg"

export const RegisterCard = () => {

	const users =["user1", "user2"]
	const emails =["camilo.osorio.ca@gmail.com", "user@gmail.com"]

	const navigate = useNavigate();

	const [fields, setFields] = useState({
		user: "",
		email: "",
		password: "",
		confirmation: "",
	});

	const [inputErrors, setInputErrors] = useState("");

	const errors = {
		id: "",
		type: "",
		description:""
	};

	const handleInput = () => {
		//----- User ----------
		errors.id = "user";
		if (fields.user == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (fields.user.length < 3 || fields.user.length > 10) {
			errors.type = "errorInvalid";
			errors.description = " user must have betwen 3 and 10 characters"
			setInputErrors(errors);
			return;
		}
		if (users.includes(fields.user)) {
			errors.type = "errorIsInUse";
			errors.description = " user already is in use"
			setInputErrors(errors);
			return;
		}
		//----- Email ----------
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		errors.id = "email";

		if (fields.email == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (!fields.email.match(validRegex)) {
			errors.type = "errorInvalid";
			errors.description = " invalid email"
			setInputErrors(errors);
			return;
		}
		if (emails.includes(fields.email)) {
			errors.type = "errorIsInUse";
			errors.description = " email already is in use"
			setInputErrors(errors);
			return;
		}

		//----- Password ----------
		errors.id = "password";
		if (fields.password == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (fields.password != "valido") {
			errors.type = "errorInvalid";
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
			errors.description = " passwords doesn't match"
			setInputErrors(errors);
			return;
		}

		console.log("object");

		navigate("/login");
	};

	const labelAndError = ({ fieldLabel, fieldInput, fieldError }) => (
		<div
			id="labelAndError"
			className="
					self-start ml-[80px]
					h-5 w-[400px]
					flex place-items-center
					place-content-between
					text-xs"
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
				<img src={warning} alt="" className="h-3" />
				Sorry,
				{inputErrors.type == "errorEmpty" ? " empty field" : ""}
				{inputErrors.type == "errorInvalid" ? inputErrors.description : ""}
				{inputErrors.type == "errorIsInUse" ? inputErrors.description : ""}

			</p>
		</div>
	);

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
				{labelAndError({ fieldLabel: "User", fieldInput: fields.user })}
				<input
					id="user"
					type="text"
					placeholder="User"
					onChange={(e) => setFields({ ...fields, user: e.target.value })}
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
					id="email"
					type="text"
					placeholder="Email"
					onChange={(e) => setFields({ ...fields, email: e.target.value })}
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
				{labelAndError({ fieldLabel: "Password", fieldInput: fields.password })}
				<input
					id="password"
					type="password"
					placeholder="Password"
					onChange={(e) => setFields({ ...fields, password: e.target.value })}
					className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						${
							inputErrors.id == "password" && inputErrors.type.startsWith("error")
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
					fieldInput: fields.password,
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
							inputErrors.id == "confirm password" && inputErrors.type.startsWith("error")
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
                        bg-primary-red
                        rounded-full
                        w-[432px] h-[48px]
                        font-semibold text-secondary-light
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
                        "
				>
					Login
				</button>
			</div>
		</>
	);
};
