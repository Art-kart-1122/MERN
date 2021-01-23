const User = require("../../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {check, body} = require("express-validator");

const registerValidator = [
    body("email").isEmail().withMessage("Введите коректный email")
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value}).exec();
                if(user) return Promise.reject("Пользователь с данным email уже зарегестрирован")
            } catch (e) {
                console.log(e);
            }
        }),

    body("name").isLength({min: 2, max: 100})
        .withMessage("Имя должно быть от 2 до 100 сиимволов").trim(),

    body("password").isLength({min: 8, max: 50})
        .withMessage("Пароль должен быть от 8 до 50 символов").trim(),

    body("confirm").custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error("Пароли должны совпадать")
        }
        return true
    }).trim(),
]

const loginValidator = [
    body("email").isEmail().withMessage("Введите коректный email"),

    body("password").isLength({min: 8, max: 50})
        .withMessage("Пароль должен быть от 8 до 50 символов").trim()
]
/*
const addCardValidator = [
    body("title").isLength({min: 3, max: 100})
        .withMessage("Заголовок должен быть от 8 до 50 символов").trim(),

    body("description").isLength({min: 3, max: 2000})
        .withMessage("Описание должено быть от 8 до 2000 символов").trim(),

    body("price").isLength({min: 1, max: 50})
        .withMessage("Цена должна быть от 1 до 50 символов").trim(),
]
*/
const removeCardValidator = [
    body("id").custom(value => {
            if(!mongoose.Types.ObjectId.isValid(value)) throw new Error("Card Id is incorrect")
        })
]

module.exports = {
    registerValidator,
    loginValidator,
    removeCardValidator
}