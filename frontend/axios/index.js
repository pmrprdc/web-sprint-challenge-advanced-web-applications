// ✨ implement axiosWithAuth
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const axiosWithAuth = () => {
   
    const token = localStorage.getItem("token")
    if(token){
        return axios.create({
            headers: {
              Authorization : token
              }
            })
    } else {
           return axios.create();
        
    }


}

export default axiosWithAuth;