import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: 'http://localhost:9000/api',
    withCredentials: true,
});