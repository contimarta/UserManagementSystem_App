import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Login from "./components/Login/Login.jsx";
import { useEffect, useState } from "react";
import { getUsers } from "./utils/dataServices";

function App() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState({});

	//Function that uploads the users, or an error if there is a problem with the request
	const uploadUsers = async () => {
		const data = await getUsers();

		if (!data?.error) {
			setUsers(data);
			setError({});
		}
		if (data?.error) {
			setError(data);
			setUsers([]);
		}
	};
	//Hook that builds the app the first time it is rendered
	useEffect(() => {
		uploadUsers();
	}, []);

	return (
		<div className="App">
			<Router>
				<Routes>
					{Object.keys(error).length === 0 && (
						<Route
							path="/main"
							element={<Main users={users} uploadUsers={uploadUsers} />}
						/>
					)}
					<Route path="/" element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
