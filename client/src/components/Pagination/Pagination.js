import React from "react";
import {Pagination} from "antd";
import {useSelector} from "react-redux";

const PaginationComponent = () => {
    const totalItems = useSelector(state => state.cardsReducer.totalItems);

    const onChange = (page, pageSize) => {
        console.log(page, pageSize);
    }

    return (
        <Pagination
            showSizeChanger
            onChange={onChange}
            defaultCurrent={1}
            total={totalItems}
        />
    )
}



export default PaginationComponent;