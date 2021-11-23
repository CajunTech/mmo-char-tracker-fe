import React from "react"
import { Link } from "react-router-dom"

function Header(props) {
	return (
		<div className="header">
			<Link className="mainHeaderLink" to={"/"}>
				<h1 className="title">New World Character Tracker</h1>
			</Link>
			{/* conditional to handle login/logoff header links based on if user exists in localstorage (set at login) */}
			<ul className="navLinks">
				{localStorage.user ? (
					<>
						<Link className="headerLinks" to={"/user/profile"}>
							<li className="navLink">Profile</li>
						</Link>
						<Link className="headerLinks" to={"#"}>
							<li className="navLink headerLinks" onClick={props.handleLogout}>
								Logout
							</li>
						</Link>
					</>
				) : (
					<>
						<Link className="headerLinks" to={"/user/login"}>
							<li className="navLink">Login</li>
						</Link>
						<Link className="headerLinks" to={"/user/signup"}>
							<li className="navLink">Signup</li>
						</Link>
					</>
				)}
			</ul>
		</div>
	)
}

export default Header
