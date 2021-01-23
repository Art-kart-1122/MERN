import React from "react";
import {NavLink} from "react-router-dom";
import {logout} from "../../redux/actions/auth-actions";
import {connect} from "react-redux";

const Logout = (props) => {

    const handleClick = () => props.logout()

    return (
        <NavLink to="/" onClick={handleClick}>
            Выйти
        </NavLink>
    )
}

export default connect(null, {logout})(Logout);