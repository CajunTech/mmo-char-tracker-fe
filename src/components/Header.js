import React from 'react';
import {Link } from 'react-router-dom';

export default function Header(props) {
	return <div className="header">
        <div className="header">
			<h1 className="title">MMO Character Tracker</h1>
			{props.isLoggedIn && (
				<div className="navLinks">
					<button onClick={props.logout}>Logout</button>
				</div>
			)}
			{!props.isLoggedIn && (
				<ul className="navLinks">
					<Link className="seeLinks" to={'/user/login'}>
						<li>Login</li>
					</Link>
					<Link className="seeLinks" to={'/user/signup'}>
						<li>Signup (Profile)</li>
					</Link>
				</ul>
			)}
		</div>
    </div>;
}
