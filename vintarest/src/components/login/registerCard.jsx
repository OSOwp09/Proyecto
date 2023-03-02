
export const RegisterCard = () => {
      
      const isClicked = true
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
					src="src/assets/Logo.svg"
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
				<input
					id="user"
					type="text"
					placeholder="User"
					className="
                        px-[16px]
                        bg-secondary-light
                        border-primary-dark border rounded-2xl
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-4"
				/>
				<input
					id="email"
					type="text"
					placeholder="Email"
					className="
                        px-[16px]
                        bg-secondary-light
                        border-primary-dark border rounded-2xl
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-4"
				/>
				<input
					id="password"
					type="text"
					placeholder="Password"
					className="
                        px-[16px]
                        bg-secondary-light
                        border-primary-dark border rounded-2xl
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-4"
				/>
				<input
					id="confirm-password"
					type="text"
					placeholder="Confirm password"
					className="
                        px-[16px]
                        bg-secondary-light
                        border-primary-dark border rounded-2xl
                        h-[48px] w-[432px]
                        text-[16px]
                        placeholder:text-secondary-dark
                        mb-4"
				/>
				<button
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
                              onCLick = {""}
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
