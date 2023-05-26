import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Login from "./components/Login/Login.jsx";

//In the app there are two routes: the landing page, Login, asks the user to enter her
//credentials or create an account. Once logged in the user is redirected to Main, where
//she will have access to the User Management System.
function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/main" element={<Main />} />
					<Route path="/" element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
