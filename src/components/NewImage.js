import React from "react"
import S3FileUpload from "react-s3"

function NewImage(props) {
	const config = {
		bucketName: "nwchars",
		region: "us-east-2",
		accessKeyId: process.env.REACT_APP_S3ID,
		secretAccessKey: process.env.REACT_APP_S3KEY,
	}
	// https://www.npmjs.com/package/react-s3 - S3 File Upload Information
	const upload = (e) => {
		S3FileUpload.uploadFile(e.target.files[0], config)
			.then((data) => {
				// recording image url to state for database add
				props.setImageLink(data.location)
			})
			.catch((err) => {
				alert(err)
			})
	}

	return (
		<div className="newImageContainer">
			<h2>Add New Image</h2>
			<br />
			<label>Choose Image to Upload</label>
			<br />
			<input className="uploadBtn" type="file" onChange={upload} />
			<br />
			<br />
			<form onSubmit={props.createNewImage}>
				<label>Image Title: </label>
				<br />
				<input type="text" name="imageTitle" autoComplete="off" size="35" />
				<br />
				<br />
				<label>Image Caption: </label>
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
				<br /> <br />
			</form>
		</div>
	)
}

export default NewImage
