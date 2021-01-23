import React, {useState} from "react";
import { Form, Input, Button, Spin , Alert} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {register} from "../../../../redux/actions/auth-actions";
import {clearErrors} from "../../../../redux/actions/error-actions";


const {Item} = Form;

//Check input
//If data is incorrect then onFinish method does not work
const emailRules = [
    {
        required: true,
        message: 'Введите логин !',
    }
]

const nameRules = [
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

const SignUpForm = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [visibleError, setVisibleError] = useState(false);


    const handleChangeEmail = e => setEmail(e.target.value);
    const handleChangeName = e => setName(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);
    const handleChangeConfirm = e => setConfirm(e.target.value);


    const handleSubmit = (e) => {
        props.clearErrors();
        props.register({email, name, password, confirm});
        setVisibleError(true)
    }

    const handleFormClick = () => {
        setVisibleError(false);
    }

    return (
        <Form className="login-form" name="login" onFinish={handleSubmit} onClick={handleFormClick}>

            {visibleError && props.error.id === "REGISTER_FAIL" && <Alert style={{marginBottom: "1rem"}} message={props.error.msg} type="error"/>}

            <Item name="email" rules={emailRules}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                       placeholder="Email"  onChange={handleChangeEmail} initialvalue={email}/>
            </Item>

            <Item name="name" rules={nameRules}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                       placeholder="Username"  onChange={handleChangeName} initialvalue={email}/>
            </Item>

            <Item name="password" rules={passwordRules}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password"
                       placeholder="Password" onChange={handleChangePassword} initialvalue={password}/>
            </Item>

            <Item name="confirm" rules={passwordRules}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password"
                       placeholder="Password" onChange={handleChangeConfirm} initialvalue={password}/>
            </Item>

            {props.isLoading && <Spin/>}
            <Item hidden={props.isLoading}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Sign Up
                </Button>
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
    register,
    clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
