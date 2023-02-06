import  axios  from 'axios';
const mainRequest = axios.create({
    baseURL : "http://localhost:8000",
    withCredentials : true
})

mainRequest.interceptors.response.use((res)=>{
    console.log(res.data)
    if(res.data.accessToken){
        localStorage.setItem('accessToken', res.data.accessToken)
    }
    return res
})

export default mainRequest