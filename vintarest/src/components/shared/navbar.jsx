export const Navbar = () => {
	return (
		<>
			<div
				id="navbar-container"
				className="
                h-[80px] w-auto 
                flex place-items-center gap-4
                bg-secondary-light
                font-inter
                px-4"
			>
				<div
					id="image-container"
					className="
                        w-[48px] h-[48px] flex-none
                        rounded-full"
				>
					<img
						src="https://images.pexels.com/photos/15326426/pexels-photo-15326426.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
						className="
                            w-[inherit] h-[inherit]
                            rounded-[inherit]
                            object-cover"
					/>
				</div>
				<div
					id="search"
					className="
                    flex place-items-center gap-4
                    w-screen h-[48px]
                    bg-secondary-highlight
                    rounded-2xl"
				>
					<img src="src/assets/search.svg" alt="" className="h-[16px] ml-4" />
					<input
						type="text"
						placeholder="Search"
						className="
                            w-full h-[48px]
                            bg-secondary-highlight 
                            rounded-2xl 
                            placeholder:text-secondary-dark
                            text-primary-dark"
					/>
				</div>
				<div id="chat-image" className="flex-none">
					<img
						src="src/assets/chat-square-dots-fill.svg"
						alt=""
						className="h-5"
					/>
				</div>
				<div
					id="user-image-container"
					className="
                        w-[24px] h-[24px] flex-none
                        rounded-full"
				>
					<img
						src="https://images.pexels.com/photos/15326426/pexels-photo-15326426.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
						className="
                            w-[inherit] h-[inherit]
                            rounded-[inherit]
                            object-cover"
					/>
				</div>
				<div id="arrow" className="flex-none">
					<img src="src/assets/arrow.svg" alt="" className="h-2" />
				</div>
			</div>
		</>
	);
};
