import React from 'react';
import {Link} from 'react-router-dom';

function Profile(props) {
    return (
        <div>
            <h1>Profile Page</h1>
            <h2>UserName: {localStorage.user}</h2>
            <Link className="newCharacterLink" to={'/user/newcharacter'}>
            <p>Create a new Character</p>
            </Link>
        </div>
    );
}

export default Profile;