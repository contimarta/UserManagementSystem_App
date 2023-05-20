import React, { useState } from 'react';
import { logIn } from '../../utils/authServices';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import Signup from '../Signup/Signup.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [logInFormData, setLogInFormData] = useState({ email: '', password: '' });
	const [isSignUpForm, setIsSignUpForm] = useState(false);
	const navigate = useNavigate();

	const logInChangeHandler = (e) => {
		setLogInFormData({ ...logInFormData, [e.target.name]: e.target.value });
	};

	const logInSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			let response = await logIn(logInFormData);
			if (response.status === 200) {
				navigate('/main');
			}
		} catch (err) {
			return { error: err.message };
		}
	};

	const showSignUpForm = () => {
		if (isSignUpForm === false) {
			setIsSignUpForm(true);
		}
		if (isSignUpForm === true) {
			setIsSignUpForm(false);
		}
	};

	return (
		<>
			<div className="sidenav">
				<img src={loginImage} alt="dfx people" />
			</div>
			<div className="main">
				<div className="col-md-6 col-sm-12">
					{!isSignUpForm && (
						<div className="login-form">
							<h3>Sign In</h3>
							<form onSubmit={logInSubmitHandler}>
								<div className="form-group">
									<label>Email: </label>
									<br />
									<input type="email" name="email" id="email" placeholder="Enter your email" onChange={logInChangeHandler} className="form-control" />
								</div>
								<div className="form-group">
									<label>Password: </label>
									<br />
									<input type="password" name="password" id="password" placeholder="Enter a password" onChange={logInChangeHandler} className="form-control" />
								</div>

								<button type="submit" title="login-button" className="btn btn-primary">
									Log In
								</button>
							</form>
						</div>
					)}
					{isSignUpForm && <Signup />}
				</div>
				<div className="signup-btn">
					<button type="submit" title="signup-button" onClick={showSignUpForm} className="btn btn-primary">
						{isSignUpForm ? 'Back to Log In' : 'Sign Up'}
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;