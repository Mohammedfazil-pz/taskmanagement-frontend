import axios from "axios";
import BASEURL from "./baseURL";

export const axiosConnection=async(HTTPmethod,endpoint,responceData)=>{
    const requestConfigration={
        method:HTTPmethod,
        url:BASEURL+endpoint,
        data:responceData
    }

    return await axios(requestConfigration).then((responce)=>{
       return responce;
    }).catch((error)=>{
        return error;
    })


}

export default axiosConnection