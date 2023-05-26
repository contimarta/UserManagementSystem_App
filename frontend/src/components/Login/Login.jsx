import React, { useState } from "react";
import { logIn } from "../../utils/authServices";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "../Signup/Signup.jsx";
import { useNavigate } from "react-router-dom";

//This component is the landing page, it asks the user to log in or create a new account
const Login = () => {
	const [logInFormData, setLogInFormData] = useState({
		email: "",
		password: "",
	});
	const [isSignUpForm, setIsSignUpForm] = useState(false);
	const navigate = useNavigate();

	const logInChangeHandler = (e) => {
		setLogInFormData({ ...logInFormData, [e.target.name]: e.target.value });
	};

	const logInSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await logIn(logInFormData);
			document.cookie = `token=${response.token}; path=/`;
			navigate("/main");
		} catch (err) {
			return { error: err.message };
		}
	};

	const showSignUpForm = () => {
		setIsSignUpForm(!isSignUpForm);
	};

	return (
		<>
			<h5 className="text-center mt-3 ">My User Management System</h5>

			<div className="container border mt-2 rounded p-3 bg-light col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
				<div className="row">
					<div>
						{!isSignUpForm && (
							<div>
								<p className=" mt-1">Sign in to your account:</p>

								<form onSubmit={logInSubmitHandler}>
									<div className="form-group">
										<label>Email: </label>
										<input
											type="email"
											name="email"
											id="email"
											placeholder="Enter your email"
											onChange={logInChangeHandler}
											className="form-control"
										/>
									</div>
									<div className="form-group">
										<label>Password: </label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="Enter your password"
											onChange={logInChangeHandler}
											className="form-control"
										/>
									</div>

									<button
										type="submit"
										title="login-button"
										className="btn btn-primary mt-3"
									>
										LOG IN
									</button>
								</form>
							</div>
						)}
						{isSignUpForm && <Signup />}
						<div className="signup-btn text-center mt-3">
							{!isSignUpForm ? (
								<p className="text-center mt-5">
									You don't have an account? Register here!
								</p>
							) : (
								<></>
							)}

							<button
								type="submit"
								title="signup-button"
								onClick={showSignUpForm}
								className="btn btn-warning"
							>
								{isSignUpForm ? "Back" : "Create new account"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
