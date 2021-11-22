import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile(props) {
	console.log(props.userCharacters.data);
	const userData = JSON.parse(localStorage.userProfile).data[0];
	const userCharacters = JSON.parse(localStorage.userCharacters).data;
	const userImages = JSON.parse(localStorage.userImages).data;

	return (
		<div className="profile">
			<h1 className="profileTitle">{userData.username}'s page</h1>
			<div className="profileTitleBtn">
				<Link to={'/user/edit'}>
					<button>Edit Profile</button>
					<br />
				</Link>
			</div>
			<br />
			<h2 className="profileTitle">Character List</h2>
			<div className="profileTitleBtn">
				<Link className="newCharacterLink" to={'/user/newcharacter'}>
					<button>Add New Character</button>
				</Link>
			</div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Character Name</th>
						<th scope="col">Server</th>
						<th scope="col">Faction</th>
						<th scope="col">Biography</th>
					</tr>
				</thead>
				<tbody>
					{userCharacters.map((character, index) => {
						return (
							<tr key={index} className="table-active">
								<th id={index} scope="row">
									<Link
										to={`/character`}
										id={index}
										onClick={props.setCharacter}
									>
										{character.characterName}
									</Link>
								</th>

								{/* <Link to={`/character`} onClick={props.setCharacter} >
								<th id={index} scope="row">{character.characterName}</th>
								</Link> */}
								<td>{character.server}</td>
								<td>{character.faction}</td>
								<td>{character.characterBio}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<br />
			<h2 className="profileTitle">Saved Images</h2>
			<div className="profileTitleBtn">
				<Link to={'/user/newimage'}>
					<button>Upload New Image</button>
				</Link>
			</div>
			<br />
			<div className="profileImageContainer">
				{userImages.map((image, index) => {
					return (
						<div key={index} className="imageCard">
							<p className="imageCardTitle">{image.imageName}</p>
							<div id={index} className="imageCardImage"
								style={{
									backgroundImage: `url('${image.imageLink}')`,
									backgroundPosition: 'center',
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
								}}
							>
								{/* <img className="imageCardImage" src={image.imageLink} alt="" /> */}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
