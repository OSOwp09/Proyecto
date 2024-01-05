import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/person-circle.svg";
import closeIcon from "../../assets/x-circle.svg";
import deleteHashtag from "../../assets/x.svg";
import backArrow from "../../assets/arrow.svg";
import React, { useCallback, useState, useEffect } from "react";
import { DropArea } from "./dropArea";
import { motion } from "framer-motion";
import { uploadFile, deleteFile } from "../../firebase/config";
import { CreatePublicationApi } from "../../api/Api";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

export default function UploadPhoto() {
	const navigate = useNavigate();

	const userInfo = useSelector((state) => state.auth);

	const [user, setUser] = useState("");
	const [userPhoto, setUserPhoto] = useState("");
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");

	const [image, setImage] = useState("");
	const [imgFile, setImgFile] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [hashtags, setHashtags] = useState("");
	const [showButton, setShowButton] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, () => {
			if (auth.currentUser) {
				setUser(userInfo.user);
				setUserPhoto(userInfo.photoUrl);
				setUserId(userInfo.uid);
				setToken(userInfo.token);
			}
		});
	}, [, auth, userInfo]);

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.map((file, index) => {
			const reader = new FileReader();

			reader.onload = function (e) {
				setImage(e.target.result);
			};

			reader.readAsDataURL(file);
			setImgFile(file);
			return file;
		});
	}, []);

	const hanndleResizeInput = (element, px) => {
		element.target.style.height = px;
		element.target.style.height = element.target.scrollHeight + "px";
	};

	const characterLimitTitle = 30;
	const handdleTitleChange = (title) => {
		if (title.target.value.length <= characterLimitTitle) {
			setTitle(title.target.value);
			hanndleResizeInput(title, "26px");
		}
	};

	const characterLimitDescription = 100;
	const handdleDescriptionChange = (description) => {
		if (description.target.value.length <= characterLimitDescription) {
			setDescription(description.target.value);
			hanndleResizeInput(description, "18px");
		}
	};

	const HashtagComponent = ({ text, onClick }) => {
		return (
			<div
				className="w-fit h-fit 
				text-xs text-secondary-light
				pl-2 pr-1
				bg-primary-highlight rounded-2xl
				flex place-items-center gap-1"
			>
				<p>{text}</p>
				<img src={deleteHashtag} onClick={onClick} alt="" className="h-3" />
			</div>
		);
	};

	const [hashtagElementList, setHashtagElementList] = useState([]);
	const [hashtagList, setHashtagList] = useState([]);

	const characterLimitHashtags = 20;
	const handdleHashtagsChance = (hashtags) => {
		if (hashtags.length <= characterLimitHashtags && !hashtags.includes(" ")) {
			setHashtags(hashtags);
		}
	};

	const handdleAddHashtag = () => {
		if (hashtags != "") {
			setHashtagElementList([...hashtagElementList, hashtags]);
			setHashtagList([...hashtagList, hashtags]);
			setHashtags("");
		}
	};

	const handleRemoveHashtag = (index) => {
		const newHashtagElement = [...hashtagElementList];
		const newHashtag = [...hashtagList];
		newHashtagElement.splice(index, 1);
		newHashtag.splice(index, 1);
		setHashtagElementList(newHashtagElement);
		setHashtagList(newHashtag);
	};

	const handdleSave = async (file) => {
		if (imgFile == "") {
			console.log("Upload an image");
			return;
		}

		let titlevar = title;
		if (title == "") {
			titlevar = " ";
		}

		let hashtagsvar;

		if (hashtagList[0] == undefined) {
			if (hashtags != "") {
				hashtagsvar = hashtags;
			} else {
				hashtagsvar = " ";
			}
		} else {
			hashtagsvar = hashtagList.join(" ");
		}

		let descriptionvar = description;
		if (description == "") {
			descriptionvar = " ";
		}

		let result;
		setShowButton(false);
		try {
			result = await uploadFile(file, userInfo.user); // upload image file to firebase

			const url = `https://firebasestorage.googleapis.com/v0/b/${result.metadata.bucket}/o/publications%2F${result.metadata.name}?alt=media`; // get image link

			const resp = await CreatePublicationApi.post(
				"",
				{
					photoURL: url,
					firebaseId: result.metadata.name,
					title: titlevar,
					description: descriptionvar,
					hashtags: hashtagsvar,
					userId: userId,
				},
				{
					headers: {
						"x-token": token,
					},
				}
			);
			// console.log(resp);
			setImgFile("");
			navigate("/home/user");
		} catch (error) {
			await deleteFile(result?.metadata?.name);
			console.log(error);
			setShowButton(true);
		}
	};

	return (
		<>
			<div
				className="
                select-none
                w-screen h-screen bg-primary-light sm:h-full sm:bg-transparent
                flex place-content-center place-items-center"
			>
				<div
					id="container"
					className="
                    relative
                    min-h-[496px] w-auto p-6
                    bg-secondary-light
                    rounded-2xl
                    shadow-lg
                    flex gap-6 place-items-center
					max-[560px]:flex-col
					max-[560px]:w-[90vw]"
				>
					<img
						id="close"
						onClick={() => navigate("/home/user")}
						className="
                        absolute right-2 top-2
                        h-6
						max-[560px]:hidden"
						src={closeIcon}
						alt=""
					/>

					<div
						id="photoContainer"
						className={`
                        w-[240px] 
						/h-[448px] 
						
						${
							image == ""
								? "h-[448px] max-[560px]:h-[40vh]  max-[560px]:w-[40vw]"
								: "h-fit max-[560px]:max-h-[50vh]  max-[560px]:w-[30vw]"
						}
						overflow-hidden
                        bg-secondary-highlight
                        rounded-2xl    
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
                        max-[560px]:w-full
                        font-semibold
                        relative"
					>
						<textarea
							id="Title"
							className="
                            bg-transparent
                            outline-none text-2xl
							h-[26px] 
							w-[240px] max-[560px]:w-full
							resize-none
							overflow-hidden"
							type="text"
							placeholder="Add Title"
							value={title}
							onChange={(e) => handdleTitleChange(e)}
						/>
						<hr className="h-[1px] w-[240px] max-[560px]:w-full bg-primary-dark border-0" />

						<div id="userPhoto" className="flex gap-3 mt-6 place-items-center">
							<img className="h-12" src={userIcon} alt="" />
							<h1 className="text-xl  w-auto h- /break-words hyphens-auto">
								{user}
							</h1>
						</div>

						<textarea
							id="Description"
							className="
							w-[240px] max-[560px]:w-full
							h-[18px]
                            bg-transparent
                            mt-6 outline-none text-sm
							resize-none
							overflow-hidden"
							type="text"
							placeholder="Add Description"
							value={description}
							onChange={(e) => handdleDescriptionChange(e)}
						/>
						<hr className="h-[1px] w-[240px] max-[560px]:w-full bg-primary-dark border-0" />

						<input
							id="Hashtags"
							className="
                            bg-transparent
                            mt-6 outline-none text-xs"
							type="text"
							placeholder="Add Hashtags"
							value={hashtags}
							onChange={(e) => handdleHashtagsChance(e.target.value)}
							onKeyDown={(e) => {
								if (e.code == "Space" || e.code == "Enter") {
									handdleAddHashtag();
								}
							}}
						/>
						<hr className="h-[1px] w-[198px] bg-primary-dark border-0" />

						<div
							id="hashtagsContainer"
							className="
							w-[220px] max-[560px]:w-full
							h-auto max-h-[170px]  max-[560px]:max-h-[70px] overflow-auto
							mt-3 flex flex-wrap gap-1"
						>
							{hashtagElementList.map((hashtag, index) => (
								<HashtagComponent
									key={index}
									text={hashtag}
									onClick={() => handleRemoveHashtag(index)}
								/>
							))}
						</div>

						<div className="w-full h-full pt-6 flex place-content-between place-items-center">
							<img
								id="close"
								onClick={() => navigate("/home/user")}
								className="
								rotate-90
								h-3
								hidden
								max-[560px]:block"
								src={backArrow}
								alt=""
							/>
							<div/>
							<button
								id="save-button"
									className={`
								${showButton ? "block" : "hidden"}
								px-2
								text-2xl text-primary-highlight
								border-2 border-primary-highlight
								hover:bg-primary-highlight
								hover:text-secondary-light
								rounded-2xl
								/absolute bottom-0 right-0
								flex gap-2`}
								onClick={() => handdleSave(imgFile)}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
