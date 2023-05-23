import { useState } from "react";
import { newUser } from "../../utils/dataServices";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateUser = ({ uploadUsers }) => {
	const [formValues, setFormValues] = useState({
		firstName: "",
		surname: "",
		email: "",
		birthdate: "",
	});
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleNewUser = async (e) => {
		e.preventDefault();
		try {
			const response = await newUser(formValues);
			uploadUsers();
			setModalIsOpen(false);
			return response;
		} catch (e) {
			return { error: e.code, errorMessage: e.message };
		}
	};
	return (
		<div className="container text-left col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8 mx-auto">
			<Button
				variant="primary"
				type="submit"
                
				onClick={() => setModalIsOpen(true)}
			>
				Add New User
			</Button>

			<Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add New User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleNewUser}>
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
				
			</Modal>
		</div>
	);
};

export default CreateUser;
