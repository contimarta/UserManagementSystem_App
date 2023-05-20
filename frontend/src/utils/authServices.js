import axios from 'axios';

const URL = `localhost:3000/auth/`;

export const signUp = async (formData) => {
	try {
		console.log(formData);
		const response = await axios.post(URL + 'signup', formData);
		return response.data;
	} catch (e) {
		return { error: e.code, errorMessage: e.message };
	}
};

export const logIn = async (formData) => {
	try {
		const response = await axios.post(URL + 'signin', formData);
		return response.data;
	} catch (e) {
		return { error: e.code, errorMessage: e.message };
	}
};
