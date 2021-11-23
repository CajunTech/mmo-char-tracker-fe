import React from "react"

function Homepage(props) {
	if (props.updateStuff) {
		props.getProfile()
		props.updateFlag()
	}

	return <div className="homepage"></div>
}

export default Homepage
