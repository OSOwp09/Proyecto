import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
	apiKey: "AIzaSyBqTD6-e2MM6vUiIRJdAHgXMo3KIKaDoik",
	authDomain: "vintarest-385f2.firebaseapp.com",
	projectId: "vintarest-385f2",
	storageBucket: "vintarest-385f2.appspot.com",
	messagingSenderId: "1040835840962",
	appId: "1:1040835840962:web:0f77cd326aa4e78997a45b",
	measurementId: "G-C922PW1SRD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export { app, auth, storage };

export async function uploadFile(file, user) {
	const storageRef = ref(storage, "publications/" + user + "-" + v4());
	return await uploadBytes(storageRef, file);
}

export async function deleteFile(firebaseId) {
	// Create a reference to the file to delete
	const desertRef = ref(
		storage,
		"gs://vintarest-385f2.appspot.com/publications/"+firebaseId
	);

	console.log(desertRef);

	//Delete the file
	deleteObject(desertRef)
		.then(() => {
			// File deleted successfully
			console.log("File deleted successfully");
		})
		.catch((error) => {
			// Uh-oh, an error occurred!
			console.log(error);
		});
}
