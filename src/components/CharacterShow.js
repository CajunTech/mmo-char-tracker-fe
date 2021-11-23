import React from "react"

function CharacterShow(props) {
	const userCharacters = JSON.parse(localStorage.userCharacters).data
	return (
		<div className="characterShowContainer">
			<h2>Character View/Edit:</h2>
			<br />
			<form onSubmit={props.handleCharacterEdit}>
				<label>Name: </label> <br />
				<input
					name="characterName"
					type="text"
					size="35"
					defaultValue={userCharacters[props.selectedCharacter].characterName}
				/>
				<br />
				<br />
				<label>Server: </label> <br />
				<input
					name="server"
					type="text"
					size="35"
					defaultValue={userCharacters[props.selectedCharacter].server}
				/>
				<br />
				<br />
				<label>Faction: </label> <br />
				<input
					name="faction"
					type="text"
					size="35"
					defaultValue={userCharacters[props.selectedCharacter].faction}
				/>
				<br />
				<br />
				<label>Biography: </label>
				<br />
				<textarea
					name="characterBio"
					rows="6"
					cols="40"
					type="text"
					defaultValue={userCharacters[props.selectedCharacter].characterBio}
				/>
				<br />
				<br />
				<button className="characterShowBtn">Save Changes</button>
			</form>
			<br />
			<button onClick={props.deleteCharacter} className="characterShowBtn">
				Delete Character
			</button>

			<br />
			<br />
		</div>
	)
}

export default CharacterShow
