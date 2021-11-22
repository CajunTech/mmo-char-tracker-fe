import React from 'react';

function ImageShow(props) {
	const userImages = JSON.parse(localStorage.userImages).data;
	return (
		<div>
			<label>Title</label>
			<input
				type="text"
				name="title"
				defaultValue={userImages[props.selectedImage].imageName}
			></input>
			<label>Caption</label>
			<input
				type="text"
				name="caption"
				defaultValue={userImages[props.selectedImage].imageCaption}
			></input>
			<br />
			<br />
			<img src=""/>
		</div>
	);
}

export default ImageShow;
