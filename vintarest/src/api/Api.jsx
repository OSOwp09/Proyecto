import axios from "axios";

export const BackendApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/photos'
})

export const ListPublicationsApi = axios.create({
    baseURL: 'https://vintarest.up.railway.app/api/publication/list'
})

export const ListUsersApi = axios.create({
    baseURL: 'https://vintarest.up.railway.app/api/auth/list'
})