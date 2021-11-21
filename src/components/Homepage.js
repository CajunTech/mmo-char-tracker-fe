import React from 'react';

function Homepage(props) {
    if (props.updateStuff) {
        props.getProfile()
        props.updateFlag()
    }
    
    return (
        <div>
            <h1>Homepage</h1>
        </div>
    );
}

export default Homepage;