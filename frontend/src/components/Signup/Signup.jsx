import React, { useState } from 'react';
import { signUp } from '../../utils/authServices';

const Signup = () => {
	const [signUpFormData, setSignUpFormData] = useState({
		email: '',
		password: '',
	});
	const signupChangeHandler = (e) => {
		setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
	};

	const signupSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await signUp(signUpFormData);
			alert("You've successfully signed up! You can now log in.");
		} catch (err) {
			return { error: err.message };
		}
	};

	return (
		<>
			<div className="login-form">
				<h4 className="text-center">Create a new account:</h4>
				<form onSubmit={signupSubmitHandler}>

					<div className="form-group">
						<label>Email: </label>
						<br />
						<input type="email" name="email" id="email" placeholder="Enter your email" onChange={signupChangeHandler} className="form-control" />
					</div>

					<div className="form-group">
						<label>Password: </label>
						<br />
						<input type="password" name="password" id="password" placeholder="Enter a password" onChange={signupChangeHandler} className="form-control" />
					</div>

					<button type="submit" className="btn btn-primary mt-3">
						SIGN UP
					</button>
				</form>
			</div>
		</>
	);
};

export default Signup;