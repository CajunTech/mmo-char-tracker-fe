import React from 'react';
import { Link } from 'react-router-dom';

function CharacterShow(props) {
	const userCharacters = JSON.parse(localStorage.userCharacters).data;
	return (
		<div>
			<h1>Character View/Edit:</h1>
			<br />
			<form onSubmit={props.handleCharacterEdit}>
				<label>Name: </label>
				<input
					name="characterName"
					type="text"
					defaultValue={userCharacters[props.selectedCharacter].characterName}
				/>
				<br />
				<br />
				<label>Server: </label>
				<input
					name="server"
					type="text"
					defaultValue={userCharacters[props.selectedCharacter].server}
				/>
				<br />
				<br />
				<label>Faction: </label>
				<input
					name="faction"
					type="text"
					defaultValue={userCharacters[props.selectedCharacter].faction}
				/>
				<br />
				<br />
				<label>Biography: </label>
				<br />
				<textarea
					name="characterBio"
					type="text"
					defaultValue={userCharacters[props.selectedCharacter].characterBio}
				/>
				<br />
				<br />
				<button>Save Changes</button>
			</form>
			<br />
			<Link to={'/user/profile'} >
				<button>Return to Profile</button>
			</Link>
		</div>
	);
}

export default CharacterShow;
