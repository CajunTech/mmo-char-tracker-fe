import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Signup(props) {
    if (props.isLoggedIn) {
        return <Redirect to={'/user/profile'} />;
      }
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
				/>
				Password:{' '}
				<input
					onChange={props.handleChange}
					type="password"
					name="password"
					value={props.password}
					autoComplete="off"
				/>
				Confirm Password:{' '}
				<input
					onChange={props.handleChange}
					type="password"
					name="confirmedPassword"
					value={props.confirmedPassword}
					autoComplete="off"
				/>
				<button>Signup</button>
			</form>
		</div>
	);
}
