import React from 'react';

function ChangePass(props) {
    return (
        <div className="changePasswordContainer">
            <h1>Change Password</h1>
            <form>
            <label>New Password: </label>
            <input type="password" name="password" autoComplete="off"></input>
            <br /> <br />
            <label>Confirm New Password:</label>
            <input type="password" name="confirmPassword" autoComplete="off"></input>
            <br /> <br />
            <button onClick={props.changePassword}>Confirm Password Change</button>
            </form>
            <br />
        </div>
    );
}

export default ChangePass;