import React from 'react';
import { Link } from 'react-router-dom';
import Uploading from './Uploading'

export default function Profile(props) {
	console.log(props.userCharacters.data);
	return (
		<div>
			<h1>Welcome {props.userProfile.data[0].displayName}</h1>
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
							<tr key= {index} className="table-active">
								<th scope="row">{character.characterName}</th>
								<td>{character.server}</td>
								<td>{character.faction}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Uploading />
            <img src="https://nwchars.s3.us-east-2.amazonaws.com/18.png"/>
		</div>
	);
}
