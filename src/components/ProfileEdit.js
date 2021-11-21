import React from 'react';
import { Link } from 'react-router-dom';

function ProfileEdit(props) {
	const userData = JSON.parse(localStorage.userProfile).data[0];
	return (
		<div>
			<h1>Profile Edit Page for {userData.username}</h1>
			<form onSubmit={props.handleUserEdit}>
				<br />
				<label>Display Name: </label>
				<input type="text" name="displayName" defaultValue={userData.displayName} />
				<br />
				<br />
				<label>E-mail address: </label>
				<input type="email" name="email" defaultValue={userData.email} />
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
			<Link to={'/user/changepass'}>
				<p>Change Password</p>
			</Link>
			<Link to={'/user/deleteaccount'}>
				<p>Delete Account</p>
			</Link>
		</div>
	);
}

export default ProfileEdit;
