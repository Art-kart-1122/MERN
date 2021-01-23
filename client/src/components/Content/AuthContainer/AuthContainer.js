import React from "react";
import {Tabs, Row, Col} from "antd";
import SignInForm from "./SignInForm/SingInForm";
import SignUpForm from "./SingUpForm/SignUpForm";
import "./AuthContainer.css"
const {TabPane} = Tabs;

const AuthContainer = () => {
    return (
        <Row justify="center">
            <Col xs={24} md={12}>
                <div className="tabs-container">
                    <Tabs defaultActiveKey="signIn" type="card" size="large">
                        <TabPane tab="Войти" key="signIn">
                            <SignInForm/>
                        </TabPane>
                        <TabPane tab="Регистрация" key="signUp">
                            <SignUpForm/>
                        </TabPane>
                    </Tabs>
                </div>
            </Col>
        </Row>

    )
}

export default AuthContainer;