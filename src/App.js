import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Login from './components/Login';
import NewCharacter from './components/NewCharacter';
import NewImage from './components/NewImage';
import 'bootswatch/dist/superhero/bootstrap.min.css';
import './App.css';
let BASE_URL = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	BASE_URL = 'http://localhost:3000';
} else {
	BASE_URL = 'https://nw-chars.herokuapp.com';
}

class App extends Component {
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
			displayName: '',
			userProfile: null,
			userCharacters: [],
			userImages: [],
			currentImageLink: null,
		};
	}

	componentDidMount = () => {
		this.getProfile();
		console.log('Component Mount Run');
	};

	getProfile = async (e) => {
		const [userProfile, userCharacters, userImages] = await Promise.all([
			axios.get(`${BASE_URL}/user/profile/${localStorage.user}`),
			axios.get(`${BASE_URL}/user/characters/${localStorage.user}`),
			axios.get(`${BASE_URL}/user/images/${localStorage.user}`),
		]);
		this.setState({
			userProfile: userProfile,
			userCharacters: userCharacters,
			userImages: userImages,
		});
	};

	handleChange = (e) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleSignup = (e) => {
		e.preventDefault();
		const data = {
			username: this.state.username,
			password: this.state.password,
			displayName: this.state.displayName,
		};
		axios
			.post(`${BASE_URL}/auth/signup`, data)
			// .then((response) => {
			// 	this.setState({ token: response.data.token });
			// })
			.then((response) => {
				// const users = response.data;
				// localStorage.setItem('jwt', users.token);
				localStorage.setItem('user', "cajuntech");
			})
			.then(() => {
				this.getProfile();
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
			.then(() => {
				this.getProfile();
			})
			.catch((error) => {
				console.log(BASE_URL);
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
				// const users = response.data;
				// localStorage.setItem('jwt', users.token);
				localStorage.setItem('user', "cajuntech");
			})
			.then(() => {
				this.getProfile();
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
		axios.post(`${BASE_URL}/user/newcharacter`, data).then(() => {
			this.getProfile();
		});
	};
	createNewImage = (e) => {
		e.preventDefault();
		console.log(e);
		const data = {
			imageOwner: localStorage.user,
			imageLink: this.state.currentImageLink,
			imageName: e.target[0].value,
			imageCaption: e.target[1].value,
		};
		axios.post(`${BASE_URL}/user/newimage`, data).then(() => {
			this.getProfile();
		});
	};

	setImage = (link) => {
		this.setState({ currentImageLink: link.split(' ').join('+') });
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
					render={(routerProps) => (
						<Profile
							{...routerProps}
							{...this.state}
							getProfile={this.getProfile}
						/>
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
						<NewCharacter
							{...routerProps}
							{...this.state}
							createNewCharacter={this.createNewCharacter}
						/>
					)}
				/>
				<Route
					path="/user/newimage"
					render={(routerProps) => (
						<NewImage
							{...routerProps}
							{...this.state}
							createNewImage={this.createNewImage}
							setImage={this.setImage}
						/>
					)}
				/>
			</div>
		);
	}
}

export default withRouter(App)