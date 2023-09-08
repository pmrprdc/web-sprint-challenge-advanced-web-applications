// ✨ implement axiosWithAuth
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const axiosWithAuth = () => {
   
    const token = localStorage.getItem("token")
    
    return axios.create({
        
    baseUrl: 'http://localhost:5001/api',
    headers: {authorization: token}    

})


}

export default axiosWithAuth;