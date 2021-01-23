const {Router} = require("express");
const fs = require("fs");
const path = require("path");
const {removeCardValidator} = require("../middleware/json-form/validators");
const {validationResult} = require("express-validator");
const Card = require("../models/card");
const {addCardMiddleware, updateCardMiddleware} = require("../middleware/multipart-form/multipart-form");
const authMiddleware = require("../middleware/auth");
const router = Router();


//addCardMiddleware return req.files: {images:[], titleImg:[] }
router.post("/add", authMiddleware, addCardMiddleware ,
    async (req, res) => {
        try {
            const {title, description, price} = req.body;
            const {images, titleImg} = req.files;

            const card = new Card({
                title, description, price,
                titleImg: Array.isArray(titleImg) ? titleImg[0].path : "",
                images: Array.isArray(images) ? images.map(img => img.path) : [],
                userId: req.user.id
            })

            const savedCard = await card.save()
            res.status(200).json({
                id: savedCard._id
            })

        } catch (e) {
            res.status(500).json({msg: e.message});
        }
    })

router.post("/update", authMiddleware, updateCardMiddleware ,
    async (req, res) => {
        try {
            const {id, title, description, price} = req.body;
            const {images, titleImg} = req.files;

            const card = await Card.findById(id).exec();

            if(!card)
                return res.status(400).json({msg: "Неправельний id"})

            if(card.userId.toString() !== req.user.id.toString())
                return res.status(400).json({msg: "у вас нету прав на ето"})

            await Promise.all([...card.images, card.titleImg].map(img => {
                return new Promise(((resolve, reject) => {
                    fs.unlink(path.join(__dirname, "../../", img), (err) => {
                        console.log(img)
                        err ? reject(err) : resolve()
                    })
                }))
            }))

            Object.assign(card,{
                title, description, price,
                titleImg: Array.isArray(titleImg) ? titleImg[0].path : "",
                images: Array.isArray(images) ? images.map(img => img.path) : [],
                userId: req.user.id
            } );

            const savedCard = await card.save();

            res.status(200).json({
                id: savedCard._id
            })

        } catch (e) {
            res.status(500).json({msg: e.message});
        }
    })

router.post("/remove", removeCardValidator,
    async (req, res) => {
        try {
            const {id} = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({msg: errors.array()[0].msg})
            }

            const card = await Card.findById(id).exec();
            if(!card)
                return res.status(400).json({msg: "Неправельний id"})

            if (card.userId.toString() !== req.user.id.toString())
                return res.status(400).json({msg: "у вас нету прав на ето"})

            await Card.deleteOne({
                _id: id,
                userId: req.user.id
            });

            res.status(200).json({id})

        } catch (e) {
            res.status(500).json({msg: e.message});
        }
    })

module.exports = router;