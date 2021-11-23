import React from "react"
import { Redirect } from "react-router-dom"

function Signup(props) {
	if (localStorage.user) {
		return <Redirect to={"/"} />
	}
	return (
		<div className="signupPageContainer">
			<br />
			<form onSubmit={props.handleSignup} className="signupForm">
				Username:
				<br />
				<input
					onChange={props.handleChange}
					type="text"
					name="username"
					value={props.username}
					autoComplete="off"
					size="35"
				/>
				<br />
				<br />
				Password:
				<br />
				<input
					onChange={props.handleChange}
					type="password"
					name="password"
					value={props.password}
					autoComplete="off"
					size="35"
				/>
				<br />
				<br />
				Confirm Password:
				<br />
				<input
					onChange={props.handleChange}
					type="password"
					name="confirmedPassword"
					value={props.confirmedPassword}
					autoComplete="off"
					size="35"
				/>
				<br />
				<br />
				Display Name:
				<br />
				<input
					onChange={props.handleChange}
					type="text"
					name="displayName"
					value={props.displayName}
					autoComplete="off"
					size="35"
				/>
				<br />
				<br />
				<button>Signup</button>
				<br />
				<br />
			</form>
		</div>
	)
}

export default Signup
