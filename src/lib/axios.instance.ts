import axios from "axios";

const $axios = axios.create({
    baseURL: "wedding-backend-steel.vercel.app",
    timeout:1000,
});

$axios.interceptors.request.use(function(config){
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`

    }
    return config
},)
export default $axios