import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";

const AuthRoute = props => {
    const {isAuth, type, ...other} = props;
    if(type === "private" && !isAuth) return <Redirect to="/auth"/>
    if(type === "guest" && isAuth) return <Redirect to="/"/>

    return <Route {...other}/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(AuthRoute)