import React from 'react'
import "./Header.css";

const UserHeader = () => {
    return (
        <span className="header" style={{backgroundColor:"gray"}}
            onClick={() => window.scroll(0, 0)}>Entertainment App
        </span>
    )
}
export default UserHeader
