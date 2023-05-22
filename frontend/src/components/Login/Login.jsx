// import React, { useState } from 'react';
// import { logIn } from '../../utils/authServices';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/Login.css';
// import Signup from '../Signup/Signup.jsx';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
// 	const [logInFormData, setLogInFormData] = useState({ email: '', password: '' });
// 	const [isSignUpForm, setIsSignUpForm] = useState(false);
// 	const navigate = useNavigate();

// 	const logInChangeHandler = (e) => {
// 		setLogInFormData({ ...logInFormData, [e.target.name]: e.target.value });
// 	};

// 	const logInSubmitHandler = async (e) => {
// 		e.preventDefault();
// 		try {
// 			let response = await logIn(logInFormData);
// 			console.log(response)
// 			if (response.message === "Login successful") {
// 				navigate('/main');
// 			}
// 		} catch (err) {
// 			return { error: err.message };
// 		}
// 	};

// 	const showSignUpForm = () => {
// 		if (isSignUpForm === false) {
// 			setIsSignUpForm(true);
// 		}
// 		if (isSignUpForm === true) {
// 			setIsSignUpForm(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="main">
// 					{!isSignUpForm && (
// 						<div className="login-form">
// 							<h3>Sign In</h3>
// 							<form onSubmit={logInSubmitHandler}>
// 								<div className="form-group">
// 									<label>Email: </label>
// 									<br />
// 									<input type="email" name="email" id="email" placeholder="Enter your email" onChange={logInChangeHandler} className="form-control" />
// 								</div>
// 								<div className="form-group">
// 									<label>Password: </label>
// 									<br />
// 									<input type="password" name="password" id="password" placeholder="Enter a password" onChange={logInChangeHandler} className="form-control" />
// 								</div>

// 								<button type="submit" title="login-button" className="btn btn-primary">
// 									Log In
// 								</button>
// 							</form>
// 						</div>
// 					)}
// 					{isSignUpForm && <Signup />}
// 				<div className="signup-btn">
// 					<button type="submit" title="signup-button" onClick={showSignUpForm} className="btn btn-primary">
// 						{isSignUpForm ? 'Back to Log In' : 'Sign Up'}
// 					</button>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Login;


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
			console.log(response)
			if (response.message === "Login successful") {
				navigate('/main');
			}
		} catch (err) {
			return { error: err.message };
		}
	};

	const showSignUpForm = () => {
		setIsSignUpForm(!isSignUpForm);
	};

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
						{!isSignUpForm && (
							<div className="login-form">
								<h3 className="text-center">Sign In</h3>
								<form onSubmit={logInSubmitHandler}>
									<div className="form-group">
										<label>Email: </label>
										<input type="email" name="email" id="email" placeholder="Enter your email" onChange={logInChangeHandler} className="form-control" />
									</div>
									<div className="form-group">
										<label>Password: </label>
										<input type="password" name="password" id="password" placeholder="Enter a password" onChange={logInChangeHandler} className="form-control" />
									</div>

									<button type="submit" title="login-button" className="btn btn-primary w-100 mt-3">
										Log In
									</button>
								</form>
							</div>
						)}
						{isSignUpForm && <Signup />}
						<div className="signup-btn text-center mt-3">
							<button type="submit" title="signup-button" onClick={showSignUpForm} className="btn btn-primary">
								{isSignUpForm ? 'Back to Log In' : 'Sign Up'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
