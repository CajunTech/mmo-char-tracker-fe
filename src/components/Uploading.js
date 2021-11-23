import React from 'react';
import S3FileUpload from 'react-s3';

const config = {
    bucketName: 'nwchars',
    // dirName: '',
    region: 'us-east-2',
    accessKeyId: process.env.REACT_APP_S3ID,
    secretAccessKey: process.env.REACT_APP_S3KEY
}

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

export default function Uploading(props) {
	return (
		<div>
			<h3>Upload Images</h3>
			<input type="file" onChange={upload} />
		</div>
	);
}
