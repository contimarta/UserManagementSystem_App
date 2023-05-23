import { useState } from "react";
import { updateUser } from "../../../../utils/dataServices";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditModal = ({ userRow, uploadUsers, modalIsOpen, setModalIsOpen }) => {
	const { id, email, firstName, surname, birthdate } = userRow;

	const [formValues, setFormValues] = useState({
		firstName: firstName,
		surname: surname,
		email: email,
		birthdate: birthdate,
	});

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const response = await updateUser(id, formValues);
			uploadUsers();
			setModalIsOpen(false);
			return response;
		} catch (e) {
			return { error: e.code, errorMessage: e.message };
		}
	};

	return (
		<Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Edit User {id}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleUpdate}>
					<Form.Group className="mb-3">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="text"
							name="firstName"
							value={formValues.firstName}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Surname</Form.Label>
						<Form.Control
							type="text"
							name="surname"
							value={formValues.surname}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="text"
							name="email"
							value={formValues.email}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Birthdate</Form.Label>
						<Form.Control
							type="text"
							name="birthdate"
							value={formValues.birthdate}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Save
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setModalIsOpen(false)}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditModal;
