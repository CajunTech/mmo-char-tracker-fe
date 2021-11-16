import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
	return (
		<div className="header">
			<div className="header">
				<Link className="headerLinks" to={'/'}>
					<h1 className="title">MMO Character Tracker</h1>
				</Link>
				<ul className="navLinks">
					{props.isLoggedIn ? (
						<>
							<Link className="headerLinks" to={'/user/profile'}>
								<li>Profile</li>
							</Link>
							<li className="headerLinks" onClick={props.handleLogout}>
								Logout
							</li>
						</>
					) : (
						<>
							<Link className="headerLinks" to={'/user/login'}>
								<li>Login</li>
							</Link>
							<Link className="headerLinks" to={'/user/signup'}>
								<li>Signup (Profile)</li>
							</Link>
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
