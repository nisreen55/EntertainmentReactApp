import React from 'react'
import { UserContext } from '../../UserContext';
import "./UserHeader.css";

const UserHeader = () => {
    const { user, logout } = React.useContext(UserContext);

    return (
       
        <span className="header">
            Hello, { user.name}!
           
            </span>

    )
}

export default UserHeader
