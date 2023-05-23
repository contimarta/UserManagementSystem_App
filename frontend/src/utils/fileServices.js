import axios from "axios";

export const uploadContract = async (file, id) => {
	const formData = new FormData();
	formData.append("contract", file); // Here is where the file is added to the form

	try {
		const response = await axios.post(
			`http://localhost:8000/users/${id}/contract`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};

export const downloadContract = async (userId) => {
	//Resource: https://bobbyhadz.com/blog/download-file-using-axios
	try {
		const response = await axios({
			url: `http://localhost:8000/users/${userId}/download`,
			method: "GET",
			responseType: "blob", // Important
		});

		// Create a link element with an URL to the file and click on it to download
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.download = `contract_${userId}.pdf`;
		document.body.appendChild(link);
		link.click();
		setTimeout(() => link.remove(), 0); // remove the link after triggering the download
	} catch (error) {
		console.error(error);
	}
};
