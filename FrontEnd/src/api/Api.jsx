import axios from "axios";

//export const pathName = 'https://vintarest-back.up.railway.app'
export const pathName = "http://localhost:4000";

//---- user auth, register and login ------->

export const CreateUserApi = axios.create({
	baseURL: `${pathName}/api/auth/new`,
});

export const LoginUserApi = axios.create({
	baseURL: `${pathName}/api/auth/`,
});

export const GenerateTokenApi = axios.create({
	baseURL: `${pathName}/api/auth/renew`,
});

//<----------------------

//------ publication upload, find, update and delete  ------->

export const CreatePublicationApi = axios.create({
	baseURL: `${pathName}/api/publication/new`,
});

export const FindPublicationApi = axios.create({
	baseURL: `${pathName}/api/search/findPublication`,
});

export const ListPublicationsByHashtags = axios.create({
	baseURL: `${pathName}/api/search/listPublicationsByHashtags`,
});

//<----------------------

//------ create comment------------>

export const CreateCommentApi = axios.create({
	baseURL: `${pathName}/api/commentary/new`,
});
//<----------------------

//---- search ------------------>

export const ListUsersApi = axios.create({
	baseURL: `${pathName}/api/search/listUsers`,
});

export const ListUsersByHashtag = axios.create({
	baseURL: `${pathName}/api/search/listUsersByHashtag`,
});

export const ListSearchCards = axios.create({
	baseURL: `${pathName}/api/search/listSearchCards`,
});

export const FindUserByEmail = axios.create({
	baseURL: `${pathName}/api/search/findUserByEmail`,
});

export const FindUserByUser = axios.create({
	baseURL: `${pathName}/api/search/findUserByUser`,
});

export const ListPublicationsApi = axios.create({
	baseURL: `${pathName}/api/search/listPublications`,
});

//<----------------------

//------ chats ------------------>

export const ListChats = axios.create({
	baseURL: `${pathName}/api/search/listChats`,
});

export const LsitUsersToChat = axios.create({
	baseURL: `${pathName}/api/search/listUsersToChat`
})

export const FetchChat = axios.create({
	baseURL: `${pathName}/api/chat/`,
});

export const NewMessage = axios.create({
	baseURL: `${pathName}/api/chat/newMessage`,
});

//<----------------------
