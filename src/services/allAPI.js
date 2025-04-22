import axiosConnection from "./commonAPI"

export const addTask=async(reqbody)=>{
    return await axiosConnection("post","/addtask",reqbody)
}

export const getTask=async()=>{
    return await axiosConnection("get",'/alltask',"")
}

export const deleteTask=async(id)=>{
    return await axiosConnection("delete",`/deletetask${id}`,{})
}

export const getOneTask=async(id)=>{
    return await axiosConnection("get",`/gettask${id}`,{})
}