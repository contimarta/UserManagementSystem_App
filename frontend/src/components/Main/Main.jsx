import { Container, Row, Col } from "react-bootstrap";
import UsersTable from "./Table/UsersTable";
import CreateUser from "./CreateUser";
import { getUsers } from "../../utils/dataServices";
import { useState, useEffect } from "react";

// This component triggers the download of users' data and displays it in a table, as well as
// provides a button to create a new user
const Main = () => {
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

	useEffect(() => {
		uploadUsers();
	}, []);

	//if error with data render error message
	if (Object.keys(error).length !== 0) {
		return <div>{error.error}</div>;
	}
	//Message to display while data is loading.
	if (users.length === 0) {
		return <div>Loading users...</div>;
	}

	return (
		<Container>
			<Row className="mt-5">
				<Col>
					<CreateUser uploadUsers={uploadUsers} />
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<UsersTable users={users} uploadUsers={uploadUsers} />
				</Col>
			</Row>
		</Container>
	);
};

export default Main;
