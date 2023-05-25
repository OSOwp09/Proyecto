import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/person-circle.svg";
import closeIcon from "../../assets/x-circle.svg";
import deleteHashtag from "../../assets/x.svg";
import React, { useCallback, useState, useEffect } from "react";
import { DropArea } from "./dropArea";
import { motion } from "framer-motion";
import { uploadFile, deleteFile } from "../../firebase/config";
import { CreatePublicationApi } from "../../api/Api";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

export const UploadPhoto = () => {
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
			console.log(file);
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
			console.log("sube algo peeee");
			return;
		}

		if (title == "") {
			console.log("escribi algo peeee");
			return;
		}

		let hashtags;

		if (hashtagList[0] == undefined) {
			console.log("escribi un hasgtag peeee");
			hashtags = " ";
		} else {
			hashtags = hashtagList.join(" ");
		}
		
		let result
		try {
			// console.log(file);

			// const resp = await CreatePublicationApi.post(
			// 	"",
			// 	{
			// 		photoFile: file,
			// 		title: title,
			// 		description: description,
			// 		hashtags: hashtags,
			// 		userId: userId,
			// 	},
			// 	{
			// 		headers: {
			// 			"x-token": token,
			// 		},
			// 	}
			// );

			//await deleteFile("enchantingnerve-80d75afa-f741-46f1-a501-0c95ed1fa25f")

			result = await uploadFile(file, userInfo.user); // upload image file to firebase

			const url = `https://firebasestorage.googleapis.com/v0/b/${result.metadata.bucket}/o/publications%2F${result.metadata.name}?alt=media`; // get image link

			const resp = await CreatePublicationApi.post(
				"",
				{
					photoURL: url,
					firebaseId: result.metadata.name,
					title: title,
					description: description,
					hashtags: hashtags,
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
			await deleteFile(result?.metadata?.name)
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
                    min-h-[496px] w-auto
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
                        w-auto /max-w-[200px] 
                        my-6 mr-6
                        font-semibold
                        relative"
					>
						<textarea
							id="Title"
							className="
                            bg-transparent
                            mt-6 outline-none text-2xl
							h-[26px]
							w-[240px]
							/hyphens-auto
							resize-none
							overflow-hidden"
							type="text"
							placeholder="Add Title"
							value={title}
							onChange={(e) => handdleTitleChange(e)}
						/>
						<hr className="h-[1px] w-[240px] bg-primary-dark border-0" />
						<div id="userPhoto" className="flex gap-3 mt-6 place-items-center">
							<img className="h-12" src={userIcon} alt="" />
							<h1 className="text-xl  w-auto h- /break-words hyphens-auto">
								{user}
							</h1>
						</div>
						<textarea
							id="Description"
							className="
							w-[240px]
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
						<hr className="h-[1px] w-[240px] bg-primary-dark border-0" />
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
							w-[220px]
							h-auto
							mt-3
							flex flex-wrap gap-1"
						>
							{hashtagElementList.map((hashtag, index) => (
								<HashtagComponent
									key={index}
									text={hashtag}
									onClick={() => handleRemoveHashtag(index)}
								/>
							))}
						</div>
						<div className="h-[50px]"></div>
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
