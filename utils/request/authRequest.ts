import axios from 'axios';
import Router from 'next/router';

const authRequest = axios.create({
    baseURL : "http://localhost:8000",
    withCredentials:true
})

authRequest.interceptors.request.use((cfg)=>{
    cfg.headers.authorization = `Bearer ` + localStorage.getItem('accessToken')
    return cfg
});

authRequest.interceptors.response.use((res)=>{
    return res
}, async (err)=>{
    if(err.response && err.response.status === 401){
        try {
            const response = await axios.get('http://localhost:8000/auth/refresh', { withCredentials: true })
            localStorage.setItem('accessToken', response.data.accessToken)

            err.config.headers['Authorization'] = `Bearer ` + localStorage.getItem('accessToken')
            return axios(err.config)
        } catch (error) {
            console.error(error)
            Router.push("/")
        }
    }else if(err.response && err.response.status === 500){
        Router.push("/")
    } else {
        console.error(err)
    }
});

export default authRequest