import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Login from './components/Login';
import NewCharacter from './components/NewCharacter';
import './App.css';
let BASE_URL = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	BASE_URL = 'http://localhost:3000';
} else {
	BASE_URL = 'https://nw-char.herokuapp.com';
}

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
			currentUser: null,
			displayName: ''
		};
	}

	getProfile = () => {
		axios
			.get(`${BASE_URL}/user/profile/${localStorage.user}`)
			.then((response) => {
				console.log(response)
			})
	}

	handleChange = (e) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleSignup = (e) => {
		e.preventDefault();
		const data = {
			username: this.state.username,
			password: this.state.password,
			displayName: this.state.displayName
		};
		axios
			.post(`${BASE_URL}/auth/signup`, data)
			// .then((response) => {
			// 	this.setState({ token: response.data.token });
			// })
			.then((response) => {
				const users = response.data;
				localStorage.setItem('jwt', users.token);
				localStorage.setItem('user', users.user.username);
			})
			.then(() => {
				this.setState({ currentUser: this.state.username });
			})
			.then(() => {
				this.setState({ username: '' });
				this.setState({ password: '' });
			})
			.then(() => {
				this.setState({ isLoggedIn: true });
			})
			.catch((error) => {
				console.log(BASE_URL)
				console.log(error);
			});
	};

	handleLogin = (e) => {
		e.preventDefault();
		const data = {
			username: this.state.username,
			password: this.state.password,
		};
		axios
			.post(`${BASE_URL}/auth/login`, data)
			// .then((response) => {
			// 	console.log(response);
			// 	this.setState({ token: response.data.token });
			// })
			.then((response) => {
				const users = response.data;
				localStorage.setItem('jwt', users.token);
				localStorage.setItem('user', users.user.username);
			})
			.then(() => {
				this.setState({ currentUser: this.state.username });
			})
			.then(() => {
				this.setState({ username: '' });
				this.setState({ password: '' });
			})
			.then(() => {
				this.setState({ isLoggedIn: true });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleLogout = (e) => {
		e.preventDefault();
		localStorage.clear();
		this.setState({ isLoggedIn: false });
		this.setState({ currentUser: null });
		this.setState({ username: '' });
		this.setState({ password: '' });
	};

	createNewCharacter = (e) => {
		const data = {
			createdBy: localStorage.user,
			characterName: e.target[1].value,
			server: e.target[2].value,
			faction: e.target[3].value,
			characterBio: e.target[4].value,
		};
		console.log(data);
		e.preventDefault();
		axios.post(`${BASE_URL}/user/newcharacter`, data);
	};

	render() {
		return (
			<div className="App">
				<Header
					isLoggedIn={this.state.isLoggedIn}
					handleLogout={this.handleLogout}
				/>
				<Route
					path="/user/signup"
					render={(routerProps) => (
						<Signup
							{...routerProps}
							{...this.state}
							handleChange={this.handleChange}
							handleSignup={this.handleSignup}
						/>
					)}
				/>
				<Route
					path="/user/profile"
					render={(routerProps) => <Profile {...routerProps} {...this.state} getProfile={this.getProfile}/>}
				/>
				<Route
					path="/user/login"
					render={(routerProps) => (
						<Login
							{...routerProps}
							{...this.state}
							handleChange={this.handleChange}
							handleLogin={this.handleLogin}
						/>
					)}
				/>
				<Route
					path="/user/newcharacter"
					render={(routerProps) => (
						<NewCharacter
							{...routerProps}
							{...this.state}
							createNewCharacter={this.createNewCharacter}
						/>
					)}
				/>
			</div>
		);
	}
}
