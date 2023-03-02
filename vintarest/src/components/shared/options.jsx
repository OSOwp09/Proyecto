export const OptionsCard = () => {
	return (
		<>
			<div
				id="card"
				className="bg-secondary-light
                h-[100px] w-[304px] rounded-2xl
                font-inter text-primary-dark
                p-3"
			>
                <div id="image-and-userinfo"
                className="flex place-items-center gap-1">
                    <img src="src/assets/person-circle.svg" alt="" className="h-12"/>
                    <div>
                        <h1 id="Name" className="text-base font-semibold">User</h1>
                        <p id="User" className="text-xs">@user</p>
                        <p id="email" className="text-xs">user@gmail.com</p>
                    </div>
                </div>
                <div>
                    <button>Log out</button>
                </div>
            </div>
		</>
	);
};
