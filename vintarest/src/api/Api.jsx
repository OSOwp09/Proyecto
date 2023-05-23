import axios from "axios";

//const pathName = 'https://vintarest.up.railway.app'
const pathName = "http://localhost:4000";

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
	baseURL: `${pathName}/api/search/listUsersByHashtag`
})

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
