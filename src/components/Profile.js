import React from 'react';

function Profile(props) {
    return (
        <div>
            <h1>Profile Page</h1>
            <h2>UserName: {props.currentUser}</h2>
        </div>
    );
}

export default Profile;