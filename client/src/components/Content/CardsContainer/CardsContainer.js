import React from "react";
import {Col, Row} from "antd";
import SearchContainer from "./SearchBlock/SearchContainer";
import Card from "./Card/Card";
import Pagination from "../../Pagination/Pagination";
import {useSelector} from "react-redux";

const CardsContainer = () => {
    const cards = useSelector(state => state.cardsReducer.cards);

    return (
        <Row justify='center' gutter={[24, 64]} style={{margin: '40px'}}>
            <Col span={24}>
                <SearchContainer/>
            </Col>
            {
                cards.map(el => {
                    return <Col key={el.id} xs={24} md={12} xl={8} xxl={6} style={{display: 'flex', justifyContent: 'center'}}>
                        <Card {...el}/>
                    </Col>
                })
            }
            <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination/>
            </Col>
        </Row>
    )
}

export default CardsContainer;