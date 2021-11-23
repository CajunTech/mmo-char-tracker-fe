import React from "react"

function ChangePass(props) {
	return (
		<div className="changePasswordContainer">
			<h2>Change Password</h2>
			<form>
				<label>New Password: </label>
				<br />
				<input
					type="password"
					name="password"
					autoComplete="off"
					size="35"
				></input>
				<br /> <br />
				<label>Confirm New Password:</label>
				<br />
				<input
					type="password"
					name="confirmPassword"
					autoComplete="off"
					size="35"
				></input>
				<br /> <br />
				<button onClick={props.changePassword}>Confirm Password Change</button>
			</form>
			<br />
		</div>
	)
}

export default ChangePass
