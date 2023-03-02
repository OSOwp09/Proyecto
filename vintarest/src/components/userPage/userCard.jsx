export const UserCard = () => {
	return (
		<>
			<div className="
            bg-secondary-light
            h-[220px] w-[240px] rounded-2xl
            font-inter text-primary-dark
            p-3 flex flex-col place-items-center">
                <img src="src/assets/person-circle.svg" alt=""
                className="h-[120px] mb-4" />
                <h1 className="font-semibold text-[32px] mb-[14px]">User</h1>
                <h2 className="text-[14px]">@user</h2>
            </div>
		</>
	);
};
