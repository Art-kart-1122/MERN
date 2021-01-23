const validator = require("validator");
const mongoose = require("mongoose");

const allowTypes = ["image/png", "image/jpg", "image/jpeg"];

const imgFileValidator = (file) => {
    if (file.size > 1024 * 1024)
        return {hasError: true, msg: "File size is very large"}

    if (!allowTypes.includes(file.mimetype))
        return {hasError: true, msg: "Mime type file is incorrect"}

    return {hasError: false, msg: ""}
}

const addCardTextValidator = ({title, description, price}) => {
    if (!validator.isLength(title, {min: 3, max: 200}))
        return {hasError: true, msg: "Title max 200 min 3"}

    if (!validator.isLength(description, {min: 3, max: 2000}))
        return {hasError: true, msg: "Description max 2000 min 3"}

    if (!validator.isLength(price, {min: 3, max: 100}))
        return {hasError: true, msg: "Price length max 100 min 3"}

    return {hasError: false, msg: ""}
}

const updateCardTextValidator = ({id, title, description, price}) => {

    if(!mongoose.Types.ObjectId.isValid(id))
        return {hasError: true, msg: "Card id is incorrect"}

    if (!validator.isLength(title, {min: 3, max: 200}))
        return {hasError: true, msg: "Title max 200 min 3"}

    if (!validator.isLength(description, {min: 3, max: 2000}))
        return {hasError: true, msg: "Description max 2000 min 3"}

    if (!validator.isLength(price, {min: 3, max: 100}))
        return {hasError: true, msg: "Price length max 100 min 3"}

    return {hasError: false, msg: ""}
}


module.exports = {
    imgFileValidator,
    addCardTextValidator,
    updateCardTextValidator
}