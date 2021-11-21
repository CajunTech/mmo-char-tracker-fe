import React from 'react';

function DeleteUser(props) {
	const userData = JSON.parse(localStorage.userProfile).data[0];

	return (
		<div className="userDeleteMessage">
			<form onSubmit={props.handleUserDelete}>
				<p>To confirm deletion please enter "{userData.username}":</p>
				<input type="text" name="username" />
				<button >Confirm Deletion</button>
			</form>
		</div>
	);
}

export default DeleteUser;
