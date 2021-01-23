import React from "react";
import {Card} from "antd";
const {Meta} = Card;


const CardComponent = (props) => {
    return (

        <Card
            hoverable
            style={{width: 240}}
            cover={<img alt="example" src={props.img}/>}
        >
            <Meta title={props.title} description={props.price}/>
        </Card>

    )
}

export default CardComponent;