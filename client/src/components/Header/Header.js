import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {withRouter} from "react-router";
import {Layout, Menu, Row, Col} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {BugTwoTone} from "@ant-design/icons";
import Logout from "./Logout";
const {Header} = Layout;


const HeaderComponent = (props) => {


    const isAuth = useSelector(state => state.auth.isAuth);


    // parseLocation({pathname: "/path/url/password" ...}, 1) === "/url"
    const parseLocation = ({pathname = "/"}, idxFragment) => pathname.split("/")
        .map(el => "/" + el)[idxFragment + 1];



    return (
        <Header>
            <Row>
                <Col span={4}>
                    <div>
                        <NavLink to = '/'><BugTwoTone style={{fontSize: '2rem'}}/></NavLink>
                    </div>
                </Col>
                <Col span={20} >
                    <Menu theme="dark" mode="horizontal"  selectedKeys={[parseLocation(props.location, 0)]} >
                        <Menu.Item key="/">
                            <NavLink to = '/'>Главная</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/cards">
                            <NavLink to = '/cards'>Объявления</NavLink>
                        </Menu.Item>

                        {isAuth ?
                            <>
                                <Menu.Item key="add">
                                    <NavLink to='/add'>Подать объявление</NavLink>
                                </Menu.Item>
                                <Menu.Item key="logout">
                                    <Logout/>
                                </Menu.Item>
                            </> :
                            <>
                                <Menu.Item key="/auth">
                                    <NavLink to='/auth'>Войти</NavLink>
                                </Menu.Item>
                            </>
                        }
                    </Menu>
                </Col>
            </Row>
        </Header>
    )
}
export default withRouter(HeaderComponent);