// const {initializeApp, cert} = require("firebase-admin/app");
// const { getStorage } = require("firebase-admin/storage");
// const {ref, uploadBytes} = require("")
// const serviceAccount = require("./serviceAccountKey.json");
// const {v4} = require("uuid");

// const firebaseConfig = {
// 	apiKey: "AIzaSyBqTD6-e2MM6vUiIRJdAHgXMo3KIKaDoik",
// 	authDomain: "vintarest-385f2.firebaseapp.com",
// 	projectId: "vintarest-385f2",
// 	storageBucket: "vintarest-385f2.appspot.com",
// 	messagingSenderId: "1040835840962",
// 	appId: "1:1040835840962:web:0f77cd326aa4e78997a45b",
// 	measurementId: "G-C922PW1SRD",
// };

// const app = initializeApp(firebaseConfig);
// // //const auth = getAuth();
// const storage = getStorage();

// // //module.exports = { app, storage };

// const uploadFile = async (file, user) => {
// 	const storageRef = ref(storage, "publications/" + user + "-" + v4());
// 	return await uploadBytes(storageRef, file);
// };

// module.exports = {
// 	uploadFile,
// };

// // var admin = require("firebase-admin");

// // admin.initializeApp({
// // 	credential: admin.credential.cert(serviceAccount),
// // });
