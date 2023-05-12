import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/person-circle.svg";
import plusICon from "../../assets/plus-circle 1.svg";
import closeIcon from "../../assets/x-circle.svg";
//import { ReactComponent as PlusICon } from "../../assets/plus-circle 1.svg";
import { TestApp } from "../aUploadTest/testApp";
import React, { useCallback, useState } from "react";
import { DropArea } from "./dropArea";
import { motion } from "framer-motion";
import { uploadFile } from "../../firebase/config";
import { BackendApi, ListUsersApi } from "../../api/Api";

export const UploadPhoto = () => {
	const navigate = useNavigate();
	const [image, setImage] = useState("");
	const [imgFile, setImgFile] = useState("");

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.map((file, index) => {
			const reader = new FileReader();

			reader.onload = function (e) {
				setImage(e.target.result);
			};

			reader.readAsDataURL(file);
			console.log(file);
			setImgFile(file);
			return file;
		});
	}, []);

	const handdleSave = async (file) => {
		try {
			// const result = await uploadFile(file);
			// const url = `https://firebasestorage.googleapis.com/v0/b/${result.metadata.bucket}/o/publications%2F${result.metadata.name}?alt=media`
			
			// console.log(`https://firebasestorage.googleapis.com/v0/b/${result.metadata.bucket}/o/publications%2F${result.metadata.name}?alt=media`);
			const resp = await ListUsersApi.get() 

			console.log(resp)
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div
				className="
                select-none
                h-screem w-screen
                flex place-content-center place-items-center"
			>
				<div
					id="container"
					className="
                    relative
                    h-[496px] w-[512px]
                    bg-secondary-light
                    rounded-2xl
                    shadow-lg
                    flex"
				>
					<img
						id="close"
						onClick={() => navigate("/home/user")}
						className="
                        absolute right-2 top-2
                        h-6"
						src={closeIcon}
						alt=""
					/>
					<div
						id="photoContainer"
						className={`
                        w-[240px] 
						h-[448px]
						${image == "" ? "h-[448px]" : "h-fit"}
						overflow-hidden
                        bg-secondary-highlight
                        rounded-2xl
                        m-6
                        flex
						relative`}
					>
						<motion.img
							src={closeIcon}
							alt=""
							className={`
						${image != "" ? "block" : "hidden"}
						hover:opacity-100
						absolute top-2 left-2 h-6
						bg-secondary-light rounded-full opacity-50
						$`}
							whileHover={{
								scale: 1.2,
								transition: { duration: 0.1 },
							}}
							onClick={() => setImage("")}
						/>
						<DropArea onDrop={onDrop} img={image} />
						<div>
							<img src={image} alt="" />
						</div>
					</div>
					<div
						id="inputsContainer"
						className="
                        w-auto max-w-[200px] 
                        my-6 mr-6
                        font-semibold
                        relative"
					>
						<input
							id="Title"
							className="
                            bg-transparent
                            mt-6 outline-none text-2xl"
							type="text"
							placeholder="Add Title"
						/>
						<hr className="h-[2px] w-[198px] bg-primary-dark border-0" />
						<div className="flex gap-3 mt-6 place-items-center">
							<img className="h-12" src={userIcon} alt="" />
							<h1 className="text-2xl">User</h1>
						</div>
						<input
							id="Description"
							className="
                            bg-transparent
                            mt-6 outline-none text-sm"
							type="text"
							placeholder="Add Description"
						/>
						<hr className="h-[2px] w-[198px] bg-primary-dark border-0" />
						<input
							id="Hashtags"
							className="
                            bg-transparent
                            mt-6 outline-none text-xs"
							type="text"
							placeholder="Add Hashtags"
						/>
						<hr className="h-[2px] w-[198px] bg-primary-dark border-0" />
						<button
							id="save-button"
							className="
                            px-2
                            text-2xl text-primary-highlight
                            border-2 border-primary-highlight
                            hover:bg-primary-highlight
                            hover:text-secondary-light
                            rounded-2xl
                            absolute bottom-0 right-0
                            flex gap-2"
							onClick={() => handdleSave(imgFile)}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
