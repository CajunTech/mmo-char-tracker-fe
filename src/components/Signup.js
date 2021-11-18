import React from 'react';

export default function Signup(props) {
	return (
		<div className="signupPage">
			<form onSubmit={props.handleSignup} className="signupForm">
				Username:{' '}
				<input
					onChange={props.handleChange}
					type="text"
					name="username"
					value={props.username}
					autoComplete="off"
				/><br /><br />
				Password:{' '}
				<input
					onChange={props.handleChange}
					type="password"
					name="password"
					value={props.password}
					autoComplete="off"
				/><br /><br />
				Confirm Password:{' '}
				<input
					onChange={props.handleChange}
					type="password"
					name="confirmedPassword"
					value={props.confirmedPassword}
					autoComplete="off"
				/><br /><br />
				Display Name:{' '}
				<input
					onChange={props.handleChange}
					type="text"
					name="displayName"
					value={props.displayName}
					autoComplete="off"
				/><br /><br />
				<button>Signup</button>
			</form>
		</div>
	);
}
