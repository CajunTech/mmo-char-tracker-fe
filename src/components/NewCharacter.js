import React from 'react';
import data from './serverdata.json';

function NewCharacter() {
	const serverList = data.map((server) => <option value={server} />);

	return (
		<div>
			<form>
                {/* 5+ Must Know HTML Tags That Almost Nobody Knows - https://www.youtube.com/watch?v=iX_QyjdctsQ */}
				<fieldset>
					<legend>New Character</legend>
                    <br/>
					<label>Name: </label>
					<input type="text" name="username" />
					<br />
					<br />
					<label>Server: </label>
					<input list="server-list" type="text" name="server" />
					<br />
					<br />
					<datalist id="server-list">{serverList}</datalist>
					<label>Faction: </label>
					<input type="text" name="username" />
					<br />
                    <br/>
				</fieldset>
                <br/>
                <button>Add Character</button>
			</form>
		</div>
	);
}

export default NewCharacter;
