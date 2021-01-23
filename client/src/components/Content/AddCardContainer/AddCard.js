import React, {useCallback, useState} from "react";
import {connect} from "react-redux";
import { Form, Input, Button, Spin , Alert, Upload} from "antd";
import {LockOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import Uploader from "./Uploader";
import {addCard}  from "../../../redux/actions/add-card-actions";

const {TextArea} = Input;
const {Item} = Form;

const titleRules = [
    {
        required: true,
        message: "Title",
    },
    {
        min: 3,
        message: "min 3"
    },
    {
        max: 100,
        message: "max 100"
    }
]

const descriptionRules = [
    {
        required: true,
        message: "Description",
    },
    {
        min: 3,
        message: "min 3"
    },
    {
        max: 2000,
        message: "max 2000"
    }
]

const AddCardComponent = props => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [titleImg, setTitleImg] = useState(null);
    const [images, setImages] = useState([]);
    const [visibleError, setVisibleError] = useState("");

    const handleChangeTitle = e => setTitle(e.target.value);
    const handleChangeDescription = e => setDescription(e.target.value);
    const handleChangePrice = e => setPrice(e.target.value);

    const handleChangeImages = useCallback((images) => {
        setImages(images);
    },[images]);

    const handleChangeTitleImg = useCallback((img) => {
        setTitleImg(img);
    },[titleImg]);

    const handleSubmit = () => {
        props.addCard({title, price, description, images, titleImg});
    }

    const handleFormClick = () => {

    }


    return (
        <Form name="add" onFinish={handleSubmit} onClick={handleFormClick}>

            {visibleError && props.error.id === "ADD_CARD_FAIL" && <Alert style={{marginBottom: "1rem"}} message={props.error.msg} type="error"/>}

            <Item name="title" rules={titleRules}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                       placeholder="Username"  onChange={handleChangeTitle} initialvalue={title}/>
            </Item>

            <Item name="descriptions" rules={descriptionRules}>
                <TextArea onChange={handleChangeDescription}/>
            </Item>

            <Item name="price">
                <Input placeholder="Price" onChange={handleChangePrice} initialvalue={price}/>
            </Item>

            <Item name="images" >
                <Uploader quantity={5} handleChange={handleChangeImages}/>
            </Item>

            <Item name="titleImg" >
                <Uploader quantity={1} handleChange={handleChangeTitleImg}/>
            </Item>

            {props.isLoading && <Spin/>}
            <Item hidden={props.isLoading}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Add
                </Button>

            </Item>
        </Form>
    )
}


export default connect(null, {addCard})(AddCardComponent);