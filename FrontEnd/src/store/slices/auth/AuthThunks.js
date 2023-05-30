import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	deleteUser,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import { authSlice, login } from "./AuthSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
	LoginUserApi,
	GenerateTokenApi,
	FindUserByEmail,
	FindUserByUser,
} from "../../../api/Api";

export const loadUser = (email) => {
	return async (dispatch) => {
		dispatch(
			authSlice.actions.login({
				email: email,
			})
		);

		const respUser = await FindUserByEmail.get("", {
			params: {
				email: email,
			},
		});

		const respToken = await GenerateTokenApi.get("", {
			params: { email: email },
		});
		
		const user = respUser.data.usuario.user;
		const name = respUser.data.usuario.name;
		const hashtags = respUser.data.usuario.hashtags;
		const photoURL = respUser.data.usuario.photoURL;
		const id = respUser.data.usuario.id;
		const token = respToken.data.token;

		dispatch(
			authSlice.actions.login({
				uid: id,
				email: email,
				user: user,
				name: name,
				hashtags: hashtags,
				photoUrl: photoURL,
				token: token,
				photoUrl: photoURL,
			})
		);
	};
};

export const registerAuth = (email, password, name, user) => {
	return async (dispatch) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (response) {
				await updateProfile(auth.currentUser, {
					displayName: `${name}/${user}`,
					photoURL: "",
				});

				//const { email } = response.user;
				//dispatch(register({ email: email }));
			} else {
				throw new Error("register failed");
			}
		} catch (error) {
			return error.code;
		}
	};
};

export const loginAuth = (email, password) => {
	return async (dispatch) => {
		try {
			const validRegex =
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			let getEmail;
			if (email.match(validRegex)) {
				const findEmail = await FindUserByEmail.get("", {
					params: {
						email: email,
					},
				});
				getEmail = findEmail.data.usuario.email.toLowerCase();
			} else {
				const findUser = await FindUserByUser.get("", {
					params: {
						user: email,
					},
				});

				getEmail = findUser.data.usuario.email.toLowerCase();
			}

			console.log(getEmail);

			const resp = await LoginUserApi.post("", {
				email: getEmail,
				password: password,
			});

			const user = resp.data.usuario.user;
			const name = resp.data.usuario.name;
			const hashtags = resp.data.usuario.hashtags;
			const photoURL = resp.data.usuario.photoURL;
			const id = resp.data.usuario._id;
			const token = resp.data.token;

			const response = await signInWithEmailAndPassword(auth, getEmail, password);

			// Update the auth state with user information
			if (response.user) {
				dispatch(
					authSlice.actions.login({
						uid: id,
						email: getEmail,
						user: user,
						name: name,
						hashtags: hashtags,
						photoUrl: photoURL,
						token: token,
						photoUrl: photoURL,
					})
				);
			}
		} catch (error) {
			console.error("Login error:", error);
			
			return error;
		}
	};
};

export const logWithGoogleAuth = () => {
	return async (dispatch) => {
		const provider = new GoogleAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			const { displayName, email, photoURL, uid } = result.user;
			await updateProfile(auth.currentUser, { displayName, photoURL });
			dispatch(login({ uid, email, displayName, photoURL }));
		} catch (error) {
			console.log(error.message);
			return error.code;
		}
	};
};

export const logoutAuth = () => {
	return async (dispatch) => {
		try {
			// sign out the user
			await auth.signOut();

			// dispatch the logout action
			dispatch(authSlice.actions.logout());
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const DeleteUser = () => {
	return async (dispatch) => {
		try {
			// Delete the user's account
			await auth.currentUser.delete();

			// Dispatch the logout action
			try {
				dispatch(authSlice.actions.logout());
			} catch (error) {}
		} catch (error) {
			console.log(error.message);
		}
	};
};
