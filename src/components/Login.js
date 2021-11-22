import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Login(props) {
	if (props.isLoggedIn) {
		return <Redirect to={'/'} />;
	}
	return (
		<div className="loginPageContainer">
			<form onSubmit={props.handleLogin} className="loginForm">
				<h2>User Login</h2>
				<br />
				Username:{' '}
				<input
					onChange={props.handleChange}
					type="text"
					name="username"
					value={props.username}
					autoComplete="off"
				/>
				<br />
				<br />
				Password:{' '}
				<input
					onChange={props.handleChange}
					type="password"
					name="password"
					value={props.password}
					autoComplete="off"
				/>< br /><br />
				<div className="loginBtnContainer">
				<button className="loginBtn">Login</button>
				</div>
			</form>
			<br />
		</div>
	);
}
