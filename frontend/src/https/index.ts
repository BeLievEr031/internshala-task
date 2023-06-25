import axios from "axios";


const api = axios.create({
    baseURL: "https://task-backend-ojpr.onrender.com/api",
    // withCredentials: true,
});
axios.defaults.withCredentials = true;

export const register = (data: IUserRegister) => api.post("/auth/register", data)
export const login = (data: IUserLogin) => api.post("/auth/login", data)

export default api;