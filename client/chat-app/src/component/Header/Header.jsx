import React from 'react'

const Header = ({ receiverId }) => {
    return (
        <header style={{ boxShadow: ".6em -.7em 1rem black", zIndex: "1", padding: ".3em" }}
        >{receiverId?.username}</header>
    )
}

export default Header