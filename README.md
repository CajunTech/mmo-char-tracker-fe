# New World Character Tracker
Frontend for New World Character Tracker
<br>
Backend Repo - https://github.com/CajunTech/mmo-char-tracker-fe
<br>
Backend Readme - https://github.com/CajunTech/mmo-char-tracker-be/blob/main/README.md
<br>
<br>

![nwcharmain](https://user-images.githubusercontent.com/89054252/142974415-a463eb5d-66e8-44ba-bfd1-a907d81f033c.png)


Link to application - https://nw-char.surge.sh/
<br>

# Technologies used:</br>
React, Node.js, PostgreSQL, JavaScript, CSS (Bootstrap), Sequelize ORM, bcrypt, Amazon S3, Surge and Heroku for hosting
<br>

# Reason for application and approach:
New World is a game released by Amazon in October 2021. This application was designed to allow players of New World to keep character information, screenshots, etc. with the intent of having a site to display transmogs like many other MMOs once they are introduced to the game. I started out with a focus on authentication, encryption and JSON Web Tokens. I ran into issues with JSON Web Tokens and then began to leverage local storage (first time using) in an attempt to handle some form of user/state persistance on page revisits and refreshes. I was able to build in CRUD functionality for all three aspects (users, characters, images) of the current application and leveraged Amazon S3 for image storage. 
<br>
<br>
ERD:
<br>
![nwcharerd](https://user-images.githubusercontent.com/89054252/142975615-e42fecea-5bd7-44a9-b47b-12287eb62271.png)

</br>

User Stories:
- As a User I would like the ability to create account.
- As a User I would like the ability to login to application.
- As a User I would like the ability to edit my account details.
- As a User I would like the ability to delete account.
- As a User I would like the ability to create characters.
- As a User I would like the ability to edit my characters.
- As a User I would like the ability to delete my characters.
- As a User I would like the ability to easily view and access characters I have created.
- As a User I would like the ability to create images.
- As a User I would like the ability to edit my images.
- As a User I would like the ability to delete my images.
- As a User I would like the ability to easily view and access images I have created.
<br>

# Main features (* denotes first time using):
- User profile page showing user's characters and images
- Amazon S3 integration*
- Local Storage utilization*
- Fieldset, data-list, options usage*
<br>

Sample view/edit screens:
<br>
Character view/edit            |  User view/edit
:-------------------------:|:-------------------------:
![characterviewedit](https://user-images.githubusercontent.com/89054252/142976544-bbc92349-e627-4aae-951a-01bae427b916.png)  |  ![userviewedit](https://user-images.githubusercontent.com/89054252/142976665-b3e94655-f41a-4285-82e3-47bd23ab8b40.png)

# Code snippets
Pull user related data from DB to Local Storage
```js
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
  ```
  Maps game's server list (approximately 400) to a searchable datalist
  ```js
  function NewCharacter(props) {
	const serverList = data.map((server, index) => (
		<option value={server} key={index} />
	))

	<datalist id="server-list">{serverList}</datalist>
 ```
 Allows for upload of image files to Amazon S3 bucket
 ```js
	// https://www.npmjs.com/package/react-s3 - S3 File Upload Information
	const upload = (e) => {
		S3FileUpload.uploadFile(e.target.files[0], config)
			.then((data) => {
				// recording image url to state for database add
				props.setImageLink(data.location)
			})
			.catch((err) => {
				alert(err)
			})
	}
```
<br>

# Known issues:
- Timing issues with functions calling local storage sometimes require refreshes to get correct data
- Some information stored in local storage is not needed

<br>


# What's left:
- Revisit JSON Web Tokens
- Revisit state vs local storage
- Allow for users to flag images and characters for public visibility
- Allow like/favorite of images and characters
- Investigate rating system for images
- Investigate inclusion of other games or removal of New World specific settings
</br>
</br>
</br>
This website may contain copyrighted material, the use of which may not have been specifically authorized by the copyright owner. The material contained in this website is distributed without profit for research and educational purposes.
This should constitute a ‘fair use’ of any such copyrighted material (referenced and provided for in section 107 of the US Copyright Law).
If you wish to use any copyrighted material from this site for purposes of your own that go beyond ‘fair use’, you must obtain expressed permission from the copyright owner.

