import React, { useState } from 'react';
import { Upload, Button, message,Modal } from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';

//props = {quantity}
const Uploader = (props) => {
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const getBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    const type = ["image/jpeg", "image/png"];
    const handlePreview = async (file) => {
        try {
            //long string url
            setPreviewImage(await getBase64(file.originFileObj));
            setPreviewVisible(true);
        } catch (e) {
            setPreviewVisible(false);
            console.log(e);
        }
    }
    const handleCancel = () => setPreviewVisible(false);

    const uploaderProps = {
        customRequest: ({file, onSuccess}) => {
            onSuccess("Done", file);
        },
        fileList,
        listType: "picture-card",
        beforeUpload: file => {
            if (!type.includes(file.type)) {
                message.error(`${file.name} is not a png file or jpeg/jpg`);
            }
            return type.includes(file.type)
        },
        onPreview: handlePreview,
        onChange: ({fileList}) => {
            const currentList = fileList.filter(el => el.response === "Done");
            setFileList(currentList);
            props.handleChange(currentList.map(img => img.originFileObj))
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <>
            <Upload {...uploaderProps}>
                {fileList.length < props.quantity && uploadButton }
            </Upload>
            <Modal visible={previewVisible}
                   footer={null} onCancel={handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    )
}

export default Uploader;