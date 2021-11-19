import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile(props) {
	console.log(props.userCharacters.data);
	return (
		<div>
			<h1>{props.userProfile.data[0].displayName}'s Profile Page</h1>
			<br />
			<h2>Character List</h2>
			<Link className="newCharacterLink" to={'/user/newcharacter'}>
				<p>Add New Character</p>
			</Link>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Character Name</th>
						<th scope="col">Server</th>
						<th scope="col">Faction</th>
					</tr>
				</thead>
				<tbody>
					{props.userCharacters.data.map((character, index) => {
						return (
							<tr key={index} className="table-active">
								<th scope="row">{character.characterName}</th>
								<td>{character.server}</td>
								<td>{character.faction}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Link to={'/user/newimage'}>
				<p>Upload New Image</p>
			</Link>
			<div className="profileImageContainer">
				{props.userImages.data.map((image, index) => {
					return (
						<div key={index} className="imageCard">
							<p>{image.imageName}</p>
							<img src={image.imageLink} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
