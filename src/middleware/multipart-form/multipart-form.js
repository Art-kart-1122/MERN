const multer = require("multer");
const {storage, addCardFilter, updateCardFilter} = require("./multer-config");


const addCardUploader = multer({
    storage,
    fileFilter: addCardFilter
}).fields([
        {name: "images", maxCount: 8},
        {name: "titleImg", maxCount: 1}
        ])


const updateCardUploader = multer({
    storage,
    fileFilter: updateCardFilter
}).fields([
        {name: "images", maxCount: 8},
        {name: "titleImg", maxCount: 1}
    ])


const filesMiddlewareCreator = upload => (req, res, next) => {
    upload(req, res, (err) => {
        if(err instanceof multer.MulterError) return res.status(500).json({msg: "Server error"})
        if(err) return res.status(400).json({msg: err})

        next()
    })
}


module.exports = {
    addCardMiddleware: filesMiddlewareCreator(addCardUploader),
    updateCardMiddleware: filesMiddlewareCreator(updateCardUploader)
}