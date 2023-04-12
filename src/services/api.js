import axios from "axios";

const api = axios.create({
    baseURL:"http://ec2-3-90-41-184.compute-1.amazonaws.com:5000"
})

export default api