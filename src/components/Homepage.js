import React from "react"

function Homepage(props) {
	// assign data from DB to local storage if update flag is true
	if (props.updateStuff) {
		props.getProfile()
	}

	return <div className="homepage"></div>
}

export default Homepage
