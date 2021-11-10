import React, { Component } from 'react';
import {Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Signup from './components/Signup';
import Profile from './components/Profile'
import './App.css';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			confirmedPassword: '',
			token: '',
			userData: [],
			isLoggedIn: false,
		};
	}
	
	handleChange = (e) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleSignup = (e) => {
		e.preventDefault();
		const data = {
			username: this.state.username,
			password: this.state.password,
		};
		axios
			.post('http://localhost:3001/auth/signup', data)
			.then((response) => {
				console.log(response);
				// Other logic (maybe a redirect)
				this.setState({ token: response.data.token });
			})
			.then(() => {
				this.showUserProfile();
			})
			.then(() => {
				this.setState({ isLoggedIn: true });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	logout = (e) => {
		e.preventDefault();
		this.setState({ isLoggedIn: false });
	};

	render() {
		return (
			<div className="App">
				<Header isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
				<Routes>
				<Route
					path="/user/signup"
					element={
						<Signup
							// {...routerProps}
							{...this.state}
							handleChange={this.handleChange}
							handleSignup={this.handleSignup}
						/>}	
				/>
								<Route
					path="/user/profile"
					render={(routerProps) => (
						<Profile {...routerProps} userData={this.state.userData} />
					)}
				/>
				</Routes>
			</div>
		);
	}
}
