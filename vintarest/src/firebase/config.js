
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage, ref, uploadBytes} from "firebase/storage"
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
const auth = getAuth()
const storage = getStorage()

export{app,auth,storage} 

export async function uploadFile(file){
	const storageRef = ref(storage, "publications/"+v4())
	return await uploadBytes(storageRef,file)
}