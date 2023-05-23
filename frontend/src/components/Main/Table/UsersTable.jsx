import UserRow from "./UserRow/UserRow";

const UsersTable = ({ users, uploadUsers }) => {
	const usersList = users.map((userRow, index) => (
		<UserRow key={index} userRow={userRow} uploadUsers={uploadUsers} />
	));

	return (
		<div className="container text-center col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8 mx-auto">
			{users.length === 0 && <h2>Users are loading...</h2>}
			<table className="table table-hover text-center">
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Surname</th>
						<th>Birthdate</th>
						<th>Contract </th>
						<th>Edit / Delete </th>
					</tr>
				</thead>
				<tbody>
					{/* Create a set of table rows for each user in the users array */}
					{usersList}
				</tbody>
			</table>
		</div>
	);
};

export default UsersTable;
