import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Login from './components/Login';
import NewCharacter from './components/NewCharacter';
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
			currentUser: null,
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
				this.setState({ token: response.data.token });
			})
			.then(() => {
				this.setState({currentUser: this.state.username})
			})
			.then(() => {
				this.setState({username: ''})
				this.setState({password: ''})
			})
			.then(() => {
				this.setState({ isLoggedIn: true });
			})
			.catch((error) => {
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
			.post('http://localhost:3001/auth/login', data)
			// .then((response) => {
			// 	console.log(response);
			// 	this.setState({ token: response.data.token });
			// })
			.then((response) => {
				const users = response.data
				  localStorage.setItem('jwt', users.token)
				  localStorage.setItem('user',users.user.username)
				  console.log('users', users) // undefined
			})
			.then(() => {
				this.setState({currentUser: this.state.username})
			})
			.then(() => {
				this.setState({username: ''})
				this.setState({password: ''})
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
		localStorage.clear()
		this.setState({ isLoggedIn: false });
		this.setState({currentUser: null});
		this.setState({username: ''})
		this.setState({password: ''})
	};

	render() {
		return (
			<div className="App">
				<Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
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
						render={(routerProps) => (
							<Profile {...routerProps} {...this.state} />
						)}
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
							<NewCharacter {...routerProps} {...this.state} />
						)}
					/>
			</div>
		);
	}
}
