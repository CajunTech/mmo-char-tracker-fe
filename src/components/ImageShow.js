import React from "react"

function ImageShow(props) {
	const userImages = JSON.parse(localStorage.userImages).data
	return (
		<div>
			<div className="imageShowContainer">
				<br />
				<form onSubmit={props.handleImageEdit}>
					<h3>Image Information</h3>
					<label>Title: </label>
					<br />
					<input
						type="text"
						name="title"
						size="40"
						defaultValue={userImages[props.selectedImage].imageName}
					></input>
					<br />
					<br />
					<label>Caption: </label>
					<br />
					<textarea
						type="text"
						name="caption"
						rows="4"
						cols="40"
						defaultValue={userImages[props.selectedImage].imageCaption}
					></textarea>
					<br /> <br />
					<button>Submit Changes</button>
				</form>
				<br />
				<button onClick={props.deleteImage}>Delete Image</button>
				<br /> <br />
			</div>
			<img
				className="fullImage"
				src={userImages[props.selectedImage].imageLink}
				alt=""
			/>
		</div>
	)
}

export default ImageShow
