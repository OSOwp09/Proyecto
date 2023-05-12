import { useDropzone } from "react-dropzone";

function DropBox({ onDrop }) {
	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		open,
		isdragaccept,
		isfocused,
		isdragreject,
	} = useDropzone({
		accept: "image/*",
		onDrop,
		noClick: true,
		noKeyboard: true,
	});

	const lists = acceptedFiles.map((list) => (
		<li key={list.path}>
			{list.path} - {list.size} bytes
		</li>
	));

	return (
		<>
			{" "}
			<section className="dropbox">
				<div
					className="dropbox"
					{...getRootProps({ isdragaccept, isfocused, isdragreject })}
				>
					{/* <input {...getInputProps()} /> */}
					<p>Drag 'n' drop some files here</p>
					<button type="button" className="btn" onClick={open}>
						Click to select file
					</button>
				</div>
			</section>
		</>
	);
}

export default DropBox;
