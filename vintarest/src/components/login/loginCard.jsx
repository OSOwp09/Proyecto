
export const LoginCard = () => {
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
                        mb-[40px]"
				/>
				<button
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
					id="O"
					className="
                        bg-secondary-light
                        h-[16px] w-[16px]
                        border-primary-dark border-2 rounded-full
                        my-[24px]"
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
						src="src/assets/facebook.svg"
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
					<img
						className="w-[24px] mr-[100px]"
						src="src/assets/google.svg"
						alt="facebook"
					/>
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
					onClick = {""}
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
