import React, {useState} from "react";
import { Form, Input, Button, Spin , Alert} from "antd";
import {NavLink} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import "./SignInForm.css";
import {connect} from "react-redux";
import {login} from "../../../../redux/actions/auth-actions";
import {clearErrors} from "../../../../redux/actions/error-actions";


const {Item} = Form;

//Check input
//If data is incorrect then onFinish method does not work
const usernameRules = [
    {
        required: true,
        message: 'Введите логин !',
    }
]

const passwordRules = [
    {
        required: true,
        message: 'Введите пароль !',
    },
    {
        min: 3,
        message: "Неверній пароль"
    }
]

const SignInForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visibleError, setVisibleError] = useState(false);


    const handleChangeEmail = e => setEmail(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);


    const handleSubmit = (e) => {
        props.clearErrors();
        props.login({email, password});
        setVisibleError(true)
    }

    const handleFormClick = () => {
        setVisibleError(false);
    }

    return (
        <Form className="login-form" name="login" onFinish={handleSubmit} onClick={handleFormClick}>

            {visibleError && props.error.id === "LOGIN_FAIL" && <Alert style={{marginBottom: "1rem"}} message={props.error.msg} type="error"/>}

            <Item name="email" rules={usernameRules}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                       placeholder="Username"  onChange={handleChangeEmail} initialvalue={email}/>
            </Item>

            <Item name="password" rules={passwordRules}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password"
                       placeholder="Password" onChange={handleChangePassword} initialvalue={password}/>
            </Item>

            {props.isLoading && <Spin/>}
            <Item hidden={props.isLoading}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <NavLink className="login-form-forgot" to="/auth">Forgot password</NavLink>
            </Item>
        </Form>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    error: state.error
})

// return props.login ~ (store.dispatch, login) => (info) => store.dispatch(login(info))

const mapDispatchToProps = {
    login,
    clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
