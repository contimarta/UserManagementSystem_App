import axios from "axios";
axios.defaults.withCredentials = true;

//Functions that handle file upload and download. 
//Resources used: https://rapidapi.com/guides/upload-files-react-axios
//https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743

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
			responseType: "blob", 
		});

		// Creates a link element with an URL to the file and click on it to download
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.download = `contract_${userId}.pdf`;
		document.body.appendChild(link);
		link.click();
		setTimeout(() => link.remove(), 0); // removes the link after triggering the download
	} catch (error) {
		console.error(error);
	}
};
