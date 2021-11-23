import React from "react"
import { Link } from "react-router-dom"

function ProfileEdit(props) {
	const userData = JSON.parse(localStorage.userProfile).data[0]
	return (
		<div className="profileEditContainer">
			<h1>Profile Edit - {userData.username}</h1>
			<form onSubmit={props.handleUserEdit}>
				<br />
				<label>Display Name: </label>
				<br />
				<input
					type="text"
					name="displayName"
					defaultValue={userData.displayName}
					size="35"
				/>
				<br />
				<br />
				<label>E-mail address: </label>
				<br />
				<input
					type="email"
					name="email"
					defaultValue={userData.email}
					size="35"
				/>
				<br />
				<br />
				<label>User Bio: </label>
				<br />
				<textarea
					name="characterBio"
					rows="8"
					cols="50"
					defaultValue={userData.userBio}
				/>
				<br />
				<button>Save Changes</button>
			</form>
			<br />
			<Link to={"/user/changepass"}>
				<button>Change Password</button>
			</Link>
			<br />
			<br />
			<Link to={"/user/deleteaccount"}>
				<button>Delete Account</button>
			</Link>
			<br />
			<br />
		</div>
	)
}

export default ProfileEdit
