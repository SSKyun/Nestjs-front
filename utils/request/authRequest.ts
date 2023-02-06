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
}, (err)=>{
    if(err.response.status === 401){
     axios.get('http://localhost:8000/auth/refresh',{withCredentials:true}).then((res) => {
        localStorage.setItem('accessToken',res.data.accessToken);

        err.config.headers['Authorization'] = `Bearer ` + localStorage.getItem('accessToken')
        return axios(err.config)
       })

    }else if(err.response.status === 500){
        Router.push("/")
    }
});

export default authRequest