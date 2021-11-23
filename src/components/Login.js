import React from "react"
import { Redirect } from "react-router-dom"

function Login(props) {
	if (props.isLoggedIn) {
		return <Redirect to={"/"} />
	}
	return (
		<div className="loginPageContainer">
			<form onSubmit={props.handleLogin} className="loginForm">
				<h2>User Login</h2>
				<br />
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
				<div className="loginBtnContainer">
					<button className="loginBtn">Login</button>
				</div>
			</form>
			<br />
		</div>
	)
}

export default Login
