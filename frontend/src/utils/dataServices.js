import axios from "axios";

export const getUsers = async () => {
    try{const response = await axios.get(`http://localhost:8000/users`);
    
        return response.data;}
    catch(error){return {error:error.message}}
}

export const deleteUser = async (id) => {
    try{const response = await axios.delete(`http://localhost:8000/users/${id}`);
    
        return response.data;}
    catch(error){return {error:error.message}}
}

export const updateUser = async (id, newData) =>{
    try{const response = await axios.put(`http://localhost:8000/users/${id}`, newData);
    
    return response.data;}
catch(error){return {error:error.message}}

}

export const newUser = async (newData) =>{
    try{const response = await axios.post(`http://localhost:8000/users`, newData);
    
    return response.data;}
catch(error){return {error:error.message}}

}
