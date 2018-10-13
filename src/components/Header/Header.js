import React from 'react';
import { Link } from "react-router-dom";

var Header = (props) => {
    return (

        <div className="Header" >

            <Link to="/">
                <div className='links'>Dashboard</div>
            </Link>

            <Link to="/add">
                <div className='links'>Add to Form</div>
            </Link>

        </div>

    )
}

export default Header;