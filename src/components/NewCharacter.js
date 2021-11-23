import React from "react"
import data from "./serverdata.json"

function NewCharacter(props) {
	const serverList = data.map((server, index) => (
		<option value={server} key={index} />
	))

	return (
		<div className="newCharacterContainer">
			<form onSubmit={props.createNewCharacter}>
				{/* 5+ Must Know HTML Tags That Almost Nobody Knows - https://www.youtube.com/watch?v=iX_QyjdctsQ */}
				<fieldset>
					<h2>New Character</h2>
					<br />
					<label>Name: </label> <br />
					<input
						type="text"
						name="characterName"
						autoComplete="off"
						size="35"
					/>
					<br />
					<br />
					<label>Server: </label>
					<br />
					<input list="server-list" type="text" name="server" size="35" />
					<br />
					<br />
					<datalist id="server-list">{serverList}</datalist>
					<label>Faction: </label>
					<br />
					<input list="faction-list" type="text" name="faction" size="35" />
					<datalist id="faction-list">
						<option value="Covenant" />
						<option value="Marauders" />
						<option value="Syndicate" />
					</datalist>
					<br />
					<br />
					<label>Character Bio</label>
					<br />
					<textarea id="bio" name="characterBio" rows="8" cols="50" />
					<br />
					<br />
				</fieldset>
				<button>Add Character</button>
				<br />
				<br />
			</form>
		</div>
	)
}

export default NewCharacter
