import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { deleteUser } from "../../../utils/dataServices";
import Modal from "react-modal";
import { updateUser } from "../../../utils/dataServices";
import { useState } from "react";


const UserRow = ({ userRow, uploadUsers }) => {
	const { id, email, firstName, surname, birthdate } = userRow;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		firstName: firstName,
		surname: surname,
		email: email,
		birthdate: birthdate,
	});

	const handleDelete = async (id) => {
		try {
			await deleteUser(id);
			await uploadUsers();
			alert(`User with ID ${id} has been deleted.`);
		} catch (e) {
			alert("Not possible to delete user");
		}
	};

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const response = await updateUser(id,formValues);
			setModalIsOpen(false);
			uploadUsers();
            return response;
		} catch (e) {
			return { error: e.code, errorMessage: e.message };
		}
	};

	return (
		<>
            <Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				ariaHideApp={false}
			>
				<h2>{`Edit User ${id}`}</h2>
				<form onSubmit={handleUpdate}>
					<input
						type="text"
						name="firstName"
						value={formValues.firstName}
						onChange={handleInputChange}
						className="form-control"
					/>
					<input
						type="text"
						name="surname"
						value={formValues.surname}
						onChange={handleInputChange}
						className="form-control"
					/>
					<input
						type="text"
						name="email"
						value={formValues.email}
						onChange={handleInputChange}
						className="form-control"
					/>
					<input
						type="text"
						name="birthdate"
						value={formValues.birthdate}
						onChange={handleInputChange}
						className="form-control"
					/>

					<button type="submit" className="btn btn-primary">
						Save
					</button>
					<button
						onClick={() => setModalIsOpen(false)}
						className="btn btn-primary"
					>
						Close
					</button>
				</form>
			</Modal>
			<tr>
				<td>{id}</td>
				<td>{email}</td>
				<td>{firstName}</td>
				<td>{surname}</td>
				<td>{birthdate}</td>
				<td>

					<button
						className="btn btn-primary me-md-2"
						onClick={() => setModalIsOpen(true)}
					>
						<MdModeEdit />
					</button>
					<button
						className="btn btn-danger"
						onClick={() => handleDelete(id)}
					>
						<MdDeleteOutline />
					</button>

				</td>
                
			</tr>
			
		</>
	);
};

export default UserRow;
