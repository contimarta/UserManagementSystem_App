import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit, MdDownload, MdUpload } from "react-icons/md";
import { deleteUser } from "../../../../utils/dataServices";
import { useState } from "react";
import EditModal from "./EditModal.jsx";
import {
	uploadContract,
	downloadContract,
} from "../../../../utils/fileServices";
import { Modal } from "react-bootstrap";

const UserRow = ({ userRow, uploadUsers }) => {
	const { id, email, firstName, surname, birthdate } = userRow;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleFileUpload = async (id) => {
		try {
			await uploadContract(file, id);
			setUploadModalIsOpen(false);
			await uploadUsers();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteUser(id);
			await uploadUsers();
		} catch (e) {
			alert("Not possible to delete user");
		}
	};

	const handleDownload = async (id) => {
		try {
			await downloadContract(id);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<tr>
				<td>{id}</td>
				<td>{email}</td>
				<td>{firstName}</td>
				<td>{surname}</td>
				<td>{birthdate}</td>
				<td>
					{userRow?.file && (
						<button
							type="button"
							className="btn btn-success me-md-2"
							onClick={() => handleDownload(id)}
						>
							<MdDownload />
						</button>
					)}
					{!userRow?.file && (
						<button
							type="button"
							className="btn btn-secondary me-md-2"
							onClick={() => setUploadModalIsOpen(true)}
						>
							<MdUpload />
						</button>
					)}
				</td>
				<td>
					<button
						type="button"
						className="btn btn-primary me-md-2"
						onClick={() => setModalIsOpen(true)}
					>
						<MdModeEdit />
					</button>

					<button className="btn btn-danger" onClick={() => handleDelete(id)}>
						<MdDeleteOutline />
					</button>
				</td>
				<EditModal
					userRow={userRow}
					uploadUsers={uploadUsers}
					modalIsOpen={modalIsOpen}
					setModalIsOpen={setModalIsOpen}
				/>
				<Modal
					show={uploadModalIsOpen}
					onHide={() => setUploadModalIsOpen(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>{`Upload Contract to User ID ${id}`}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<input type="file" onChange={handleFileChange} />
						<button onClick={() => handleFileUpload(id)}>Upload</button>
					</Modal.Body>
				</Modal>
			</tr>
		</>
	);
};

export default UserRow;
