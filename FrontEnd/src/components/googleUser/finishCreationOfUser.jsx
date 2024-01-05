import { useState } from "react";
import logo from "../../assets/Logo.svg";
import warning from "../../assets/exclamation-triangle.svg";
import { CreateUserApi } from "../../api/Api";
import { v4 } from "uuid";

export default function FinishCreationOfUser  ({ handdleContinue, email }) {
	const [name, setName] = useState("");
	const [user, setUser] = useState("");

	const [inputErrors, setInputErrors] = useState("");

	const errors = {
		id: "",
		type: "",
		description: "",
	};

	const labelAndError = ({ fieldLabel, fieldInput }) => (
		<div
			id="labelAndError"
			className="
					self-start 
					h-5 w-full px-3
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
				<img src={warning} alt="" className="h-3" loading="lazy"/>
				Sorry,
				{inputErrors.type == "errorEmpty" ? " empty field" : ""}
				{inputErrors.type == "errorInvalid" ? inputErrors.description : ""}
				{inputErrors.type == "errorIsInUse" ? inputErrors.description : ""}
			</p>
		</div>
	);

	const handdleNameChange = (e) => {
		setName(e);
	};

	const handdleUserChange = (e) => {
		if (!e.includes(" ")) {
			setUser(e);
		}
	};

	const handdleSubmit = async () => {
		//----- Name validation ----------
		errors.id = "name";
		if (name == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (name.length < 3 || name.length > 25) {
			errors.type = "errorInvalid";
			errors.description = " Name must have betwen 3 and 25 characters";
			setInputErrors(errors);
			return;
		}

		//----- User validation ----------
		errors.id = "user";
		if (user == "") {
			errors.type = "errorEmpty";
			setInputErrors(errors);
			return;
		}
		if (user.length < 3 || user.length > 15) {
			errors.type = "errorInvalid";
			errors.description = " user must have betwen 3 and 15 characters";
			setInputErrors(errors);
			return;
		}  


		// --------- submit info -------------
		try {
			const date =  String(new Date().toJSON());
			await CreateUserApi.post("", {
				name: name,
				user: user,
				email: email,
				password: v4(),
				photoURL: "",
				hashtags: "",
				date: date
			});

            errors.id = ""
            errors.type = "";
            errors.description = "";
            setInputErrors(errors)

			handdleContinue();
		} catch (error) {
			console.log(error.response.data.msg);
			switch (error.response.data.msg) {
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
	return (
		<>
			<div
				className="w-full h-screen
            flex place-content-center place-items-center"
			>
				<div
					id="card"
					className="h-auto w-auto relative
                    flex flex-col gap-3
                    place-items-center place-content-center
                    bg-secondary-light rounded-2xl
                    shadow-[0px_0px_24px_-12px_rgba(0,0,0,0.25)]
                    px-5 py-5 "
				>
					<div
						className="absolute top-[-51px]
                    w-auto h-auto bg-secondary-light rounded-full 
                    p-6
                    shadow-[0px_0px_24px_-12px_rgba(0,0,0,0.25)]
                    "
					>
						<img src={logo} alt="" c />
					</div>
					<div className="h-[51px]"></div>
					<h1 className="text-sm text-secondary-dark">
						You only need to fill this out once
					</h1>
					<div>
						{labelAndError({ fieldLabel: "Name", fieldInput: name })}
						<input
							id="name"
							type="text"
							placeholder="Name"
							onChange={(e) => handdleNameChange(e.target.value)}
							value={name}
							className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						outline-none
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-1`}
						/>
					</div>
					<div>
						{labelAndError({ fieldLabel: "User", fieldInput: user })}
						<input
							id="user"
							type="text"
							placeholder="user"
							onChange={(e) => handdleUserChange(e.target.value)}
							value={user}
							className={`
                        px-[16px]
                        bg-secondary-light
                        border rounded-2xl
						outline-none
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-1`}
						/>
					</div>
					<button
						onClick={() => handdleSubmit()}
						id="Register-btn"
						className="
						border-[1px]
						text-primary-red
						border-primary-red
                        hover:bg-primary-red
						hover:text-secondary-light
                        rounded-full
                        w-[432px] h-[48px]
                        font-semibold"
					>
						Continue
					</button>
				</div>
			</div>
		</>
	);
};
