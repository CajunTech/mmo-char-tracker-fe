import React from 'react';
import S3FileUpload from 'react-s3';


export default function NewImage(props) {

	const config = {
		bucketName: 'nwchars',
		// dirName: '',
		region: 'us-east-2',
		accessKeyId: 'AKIAZJ5Z5HGAS742ZQMD',
		secretAccessKey: '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',
	};

	const upload = (e) => {
		S3FileUpload.uploadFile(e.target.files[0], config)
			.then((data) => {
				console.log(data.location);
				props.setImage(data.location)
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
