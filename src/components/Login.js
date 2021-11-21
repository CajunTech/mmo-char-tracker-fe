import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Login(props) {
	if (props.isLoggedIn) {
		return <Redirect to={'/'} />;
	}
	return (
		<div className="loginPage">
			<form onSubmit={props.handleLogin} className="loginForm">
				Username:{' '}
				<input
					onChange={props.handleChange}
					type="text"
					name="username"
					value={props.username}
					autoComplete="off"
				/>
				Password:{' '}
				<input
					onChange={props.handleChange}
					type="password"
					name="password"
					value={props.password}
					autoComplete="off"
				/>
				<button>Login</button>
			</form>
		</div>
	);
}
