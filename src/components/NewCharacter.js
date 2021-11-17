import React from 'react';
import data from './serverdata.json';

export default function NewCharacter(props) {
	const serverList = data.map((server, index) => (
		<option value={server} key={index} />
	));

	return (
		<div>
			<form onSubmit={props.createNewCharacter}>
				{/* 5+ Must Know HTML Tags That Almost Nobody Knows - https://www.youtube.com/watch?v=iX_QyjdctsQ */}
				<fieldset>
					<legend>New Character</legend>
					<br />
					<label>Name: </label>
					<input type="text" name="characterName" autoComplete="off" />
					<br />
					<br />
					<label>Server: </label>
					<input list="server-list" type="text" name="server" />
					<br />
					<br />
					<datalist id="server-list">{serverList}</datalist>
					<label>Faction: </label>
					<input list="faction-list" type="text" name="faction" />
					<datalist id="faction-list">
						<option value="Covenant" />
						<option value="Marauders" />
						<option value="Syndicate" />
					</datalist>
					<br />
					<br />
					<label>Character Bio</label><br/>
					<textarea id="bio" name="characterBio" rows="8" cols="50"/>
					<br />
					<br />
				</fieldset>
				<br />
				<button>Add Character</button>
			</form>
		</div>
	);
}
