
import UsersTable from "./Table/UsersTable";

const Main = ({users,uploadUsers}) => {
	

	return (
		<>
			<UsersTable users={users} uploadUsers={uploadUsers}/>
		</>
	);
};

export default Main;
