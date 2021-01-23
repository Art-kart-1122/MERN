import React from "react";
import {Route} from "react-router-dom";
import {Layout} from "antd";
import "./Content.css";
import CardsContainer from "./CardsContainer/CardsContainer";
import AuthContainer from "./AuthContainer/AuthContainer";
import AddCard from "./AddCardContainer/AddCard";
import AuthRoute from "../../HOC/authRedirect";

const {Content} = Layout;

const ContentComponent = () => {
    return (
        <Content>
            <div className="site-layout-content">
                <AuthRoute path="/" exact={true}>
                    <h1>Main</h1>
                </AuthRoute>
                <AuthRoute type="guest" path="/auth">
                    <AuthContainer/>
                </AuthRoute>
                <AuthRoute type="private" path="/cards">
                    <CardsContainer/>
                </AuthRoute>

                <AuthRoute type="private" path="/add">
                    <AddCard/>
                </AuthRoute>

            </div>
        </Content>
    )
}

export default ContentComponent;