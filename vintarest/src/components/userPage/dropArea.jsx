import { useDropzone } from "react-dropzone";
import boxArrow from "../../assets/file-arrow-up-fill.svg";

export const DropArea = ({ onDrop, img }) => {
	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		open,
		isdragaccept,
		isfocused,
		isdragdeject,
	} = useDropzone({
		accept: "image/*",
		onDrop,
		noClick: true,
		noKeyboard: true,
	});

	return (
		<>
			<div
				id="photoArea"
				{...getRootProps({ isdragaccept, isfocused, isdragdeject })}
				onClick={open}
				className={`
				${img == "" ? "block":"hidden"}
				select-none
				w-full
				rounded-2xl
				border 
				border-dashed
				border-primary-highlight 
				m-6 
				flex place-content-center place-items-center`}
			>
				<div
					id="dashedOutline"
					className={`
					flex flex-col gap-6
					font-semibold
					text-primary-highlight`}
				>
					<img className="h-8" src={boxArrow} alt="" />
					<div className="flex flex-col place-items-center">
						<h1>Drag and drop</h1>
						<h1>or</h1>
						<h1>Click to upload</h1>
					</div>
				</div>
			</div>
		</>
	);
};

