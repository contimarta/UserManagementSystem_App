import axios from "axios";

//Here you can find the functions that handle upload of users data, and edit/delete user data, as well
//as the creating a new user.
//Axios default credentials are set to true so that the cookie stored in the browser is send with each request.
axios.defaults.withCredentials = true;

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
    try{const response = await axios.put(`http://localhost:8000/users/${id}`, newData,{ withCredentials: true });
    
    return response.data;}
catch(error){return {error:error.message}}

}

export const newUser = async (newData) =>{
    try{const response = await axios.post(`http://localhost:8000/users`, newData);
    
    return response.data;}
catch(error){return {error:error.message}}

}
