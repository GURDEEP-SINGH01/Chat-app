import React from 'react'

const Header = ({ receiverId }) => {
    return (
        <header style={{ boxShadow: "-.1em .2em 1rem -.8rem black", zIndex: "1", padding: ".3em" }}
        >{receiverId?.username}</header>
    )
}

export default Header