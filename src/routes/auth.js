const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config/dev");
const router = Router();
const User = require("../models/user");
const {registerValidator, loginValidator} = require("../middleware/json-form/validators");
const authMiddleware = require("../middleware/auth");
const {validationResult} = require("express-validator");


router.post("/register", registerValidator, async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({msg: errors.array()[0].msg})
        }

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error("Error with bcrypt")

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error("Error with hash")

        const newUser = new User({
            name,
            email,
            password: hash,
            favoriteList: []
        });

        const savedUser = await newUser.save();
        if (!savedUser) throw Error("Error with DB")

        const token = jwt.sign({ id: savedUser._id }, SECRET_KEY, {
            expiresIn: 3600
        })

        res.status(200).json({
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        })
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
})

router.post("/login", loginValidator, async (req, res) => {
    try {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({msg: errors.array()[0].msg})
        }

        const user = await User.findOne({email}).exec();
        if(!user) return res.status(400).json({msg: "Такого пользователя не существует"})

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Неверный пароль"})

        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: 3600
        })

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    } catch (e) {
        res.status(500).json({msg: e.message});
    }
})

router.get('/user', authMiddleware, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(400).json({msg: "Такого пользователя не существует"});

        res.status(200).json({user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
})
module.exports = router;