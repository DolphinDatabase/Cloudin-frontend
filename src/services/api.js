import axios from "axios";

const api = axios.create({
    baseURL:"http://ec2-54-227-98-6.compute-1.amazonaws.com:5000"
})

export default api