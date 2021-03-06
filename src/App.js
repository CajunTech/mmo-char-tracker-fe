import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import Login from "./components/Login"
import NewCharacter from "./components/NewCharacter"
import NewImage from "./components/NewImage"
import ProfileEdit from "./components/ProfileEdit"
import Homepage from "./components/Homepage"
import DeleteUser from "./components/DeleteUser"
import CharacterShow from "./components/CharacterShow"
import ChangePass from "./components/ChangePass"
import ImageShow from "./components/ImageShow"
import "bootswatch/dist/lumen/bootstrap.min.css"
import "./App.css"
let BASE_URL = ""
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	BASE_URL = "http://localhost:3000"
} else {
	BASE_URL = "https://nw-chars.herokuapp.com"
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			username: "",
			password: "",
			confirmedPassword: "",
			token: "",
			userData: {},
			displayName: "",
			userProfile: null,
			userCharacters: [],
			userImages: [],
			currentImageLink: null,
			selectedCharacter: null,
			selectedImage: null,
			updateStuff: true,
		}
	}

	componentDidMount = () => {
		this.getProfile()
	}
//update called at end of most functions prior to redirect in order to force local storage updates (timing issue discovered)
	updateFlag = () => {
		this.setState({ updateStuff: false })
	}
//grab user related information from DB and push to local storage
	getProfile = async (e) => {
		const [userProfile, userCharacters, userImages] = await Promise.all([
			axios.get(`${BASE_URL}/user/profile/${localStorage.user}`),
			axios.get(`${BASE_URL}/user/characters/${localStorage.user}`),
			axios.get(`${BASE_URL}/user/images/${localStorage.user}`),
		])
		this.setState({
			userProfile: userProfile,
			userCharacters: userCharacters,
			userImages: userImages,
			updateStuff: false,
		})
		localStorage.setItem("userProfile", JSON.stringify(userProfile))
		localStorage.setItem("userCharacters", JSON.stringify(userCharacters))
		localStorage.setItem("userImages", JSON.stringify(userImages))
	}

	handleChange = (e) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value })
	}

	handleSignup = (e) => {
		e.preventDefault()
		if (this.state.password === this.state.confirmedPassword) {
			const data = {
				username: this.state.username,
				password: this.state.password,
				displayName: this.state.displayName,
			}
			axios
				.post(`${BASE_URL}/auth/signup`, data)
				.then((response) => {
					localStorage.setItem("user", response.data.user)
				})
				.then(() => {
					this.getProfile()
				})
				.then(() => {
					this.setState({ updateStuff: true })
				})
				.then(() => {
					this.setState({ username: "" })
					this.setState({ password: "" })
				})
				.then(() => {
					this.props.history.push("/")
				})
				.catch((error) => {
					console.log(error)
				})
		} else {
			alert("Passwords do not match")
		}
	}

	handleLogin = (e) => {
		e.preventDefault()
		const data = {
			username: this.state.username,
			password: this.state.password,
		}
		axios
			.post(`${BASE_URL}/auth/login`, data)
			.then((response) => {
				localStorage.setItem("user", response.data.user)
			})
			.then(() => {
				this.getProfile()
			})
			.catch((error) => {
				console.log(error)
				alert("Incorrect username or password")
			})
	}

	handleLogout = (e) => {
		e.preventDefault()
		localStorage.clear()
		this.setState({ username: "" })
		this.setState({ password: "" })
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}

	createNewCharacter = (e) => {
		const data = {
			createdBy: localStorage.user,
			characterName: e.target[1].value,
			server: e.target[2].value,
			faction: e.target[3].value,
			characterBio: e.target[4].value,
		}
		e.preventDefault()
		axios.post(`${BASE_URL}/user/newcharacter`, data).then(() => {
			this.getProfile()
		})
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}
	createNewImage = async (e) => {
		e.preventDefault()
		const data = {
			imageOwner: localStorage.user,
			imageLink: this.state.currentImageLink,
			imageName: e.target[0].value,
			imageCaption: e.target[1].value,
		}
		axios.post(`${BASE_URL}/user/newimage`, data)
		this.getProfile()
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}
// parsing of link for AWS S3 access
	setImageLink = (link) => {
		this.setState({ currentImageLink: link.split(" ").join("+") })
	}

	handleUserEdit = (e) => {
		e.preventDefault()
		const data = {
			displayName: e.target[0].value,
			email: e.target[1].value,
			userBio: e.target[2].value,
		}
		axios.post(`${BASE_URL}/user/profile/edit/${localStorage.user}`, data)
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}
	handleUserDelete = (e) => {
		e.preventDefault()
		if (e.target[0].value === localStorage.user) {
			axios.post(`${BASE_URL}/user/profile/delete/${localStorage.user}`)
			this.handleLogout(e)
		} else {
			alert("Please enter correct input to continue")
		}
	}

	setImage = (e) => {
		e.preventDefault()
		this.setState({ selectedImage: e.target.id })
		this.props.history.push("/image")
	}
	setCharacter = (e) => {
		e.preventDefault()
		this.setState({ selectedCharacter: e.target.id })
		this.props.history.push("/character")
	}

	handleCharacterEdit = (e) => {
		e.preventDefault()
		const userCharacters = JSON.parse(localStorage.userCharacters).data
		const data = {
			characterName: e.target[0].value,
			server: e.target[1].value,
			faction: e.target[2].value,
			characterBio: e.target[3].value,
		}
		axios.post(
			`${BASE_URL}/character/edit/${
				userCharacters[this.state.selectedCharacter].id
			}`,
			data
		)
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}

	handleImageEdit = (e) => {
		e.preventDefault()
		const userImages = JSON.parse(localStorage.userImages).data
		const data = {
			imageName: e.target[0].value,
			imageCaption: e.target[1].value,
		}
		axios.post(
			`${BASE_URL}/image/edit/${userImages[this.state.selectedImage].id}`,
			data
		)
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}

	deleteImage = (e) => {
		e.preventDefault()
		const userImages = JSON.parse(localStorage.userImages).data
		axios.post(
			`${BASE_URL}/image/delete/${userImages[this.state.selectedImage].id}`
		)
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}

	deleteCharacter = (e) => {
		e.preventDefault()
		const userCharacters = JSON.parse(localStorage.userCharacters).data
		axios.post(
			`${BASE_URL}/character/delete/${
				userCharacters[this.state.selectedCharacter].id
			}`
		)
		this.setState({ updateStuff: true })
		this.props.history.push("/")
	}

	changePassword = (e) => {
		e.preventDefault()
		if (e.target.form[0].value === e.target.form[1].value) {
			const data = {
				username: JSON.parse(localStorage.userProfile).data[0].username,
				password: e.target.form[0].value,
			}
			axios.post(`${BASE_URL}/user/changepassword`, data)
			this.setState({ updateStuff: true })
			this.props.history.push("/")
		} else {
			alert("Passwords do not match")
		}
	}

	render() {
		return (
			<div className="App">
				<Header handleLogout={this.handleLogout} />
				<Route
					exact
					path="/"
					render={(routerProps) => (
						<Homepage
							{...routerProps}
							{...this.state}
							getProfile={this.getProfile}
						/>
					)}
				/>
				<Route
					exact
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
					exact
					path="/user/profile"
					render={(routerProps) => (
						<Profile
							{...routerProps}
							{...this.state}
							getProfile={this.getProfile}
							setCharacter={this.setCharacter}
							setImage={this.setImage}
						/>
					)}
				/>
				<Route
					exact
					path="/user/edit"
					render={(routerProps) => (
						<ProfileEdit
							{...routerProps}
							{...this.state}
							handleUserEdit={this.handleUserEdit}
						/>
					)}
				/>
				<Route
					exact
					path="/user/changepass"
					render={(routerProps) => (
						<ChangePass
							{...routerProps}
							{...this.state}
							changePassword={this.changePassword}
						/>
					)}
				/>
				<Route
					exact
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
					exact
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
					exact
					path="/user/newimage"
					render={(routerProps) => (
						<NewImage
							{...routerProps}
							{...this.state}
							createNewImage={this.createNewImage}
							setImageLink={this.setImageLink}
						/>
					)}
				/>
				<Route
					exact
					path="/user/deleteaccount"
					render={(routerProps) => (
						<DeleteUser
							{...routerProps}
							{...this.state}
							handleUserDelete={this.handleUserDelete}
						/>
					)}
				/>
				<Route
					exact
					path="/character"
					render={(routerProps) => (
						<CharacterShow
							{...routerProps}
							{...this.state}
							handleCharacterEdit={this.handleCharacterEdit}
							getProfile={this.getProfile}
							deleteCharacter={this.deleteCharacter}
						/>
					)}
				/>
				<Route
					exact
					path="/image"
					render={(routerProps) => (
						<ImageShow
							{...routerProps}
							{...this.state}
							handleImageEdit={this.handleImageEdit}
							deleteImage={this.deleteImage}
						/>
					)}
				/>
			</div>
		)
	}
}

export default withRouter(App)
