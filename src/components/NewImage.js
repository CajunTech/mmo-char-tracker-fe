import React from 'react';
import S3FileUpload from 'react-s3';


export default function NewImage(props) {

	const config = {
		bucketName: 'nwchars',
		region: 'us-east-2',
		accessKeyId: process.env.REACT_APP_S3ID,
		secretAccessKey: process.env.REACT_APP_S3KEY
	};

	console.log(config)
	
	const upload = (e) => {
		S3FileUpload.uploadFile(e.target.files[0], config)
			.then((data) => {
				
				console.log(data.location);
				props.setImageLink(data.location)
			})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<div>
			<h3>Upload Image</h3>
			<br />
			<input type="file" onChange={upload} />
			<br />
			<br />
			<form onSubmit={props.createNewImage}>
				<label>Title: </label>
				<br />
				<input type="text" name="imageTitle" autoComplete="off" />
				<br />
				<br />
				<label>Caption: </label>
				<br />
				<textarea
					id="caption"
					type="text"
					name="imageCaption"
					rows="4"
					cols="50"
					autoComplete="off"
				/>
				<br />
				<br />
				<button>Add Image</button>
			</form>
		</div>
	);
}
