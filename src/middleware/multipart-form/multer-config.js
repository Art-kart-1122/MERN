const multer = require("multer");
const {imgFileValidator, addCardTextValidator, updateCardTextValidator} = require("./validators");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./images/")
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname)
    }
})


//
//don`t work
//const multipartFormValidatorCreator = ((textFieldsValidator, binaryFieldsValidator) =>  (req, file, cb) => {}
//

//if cb("", false) remove previous data and processing will stop

const addCardFilter = (req, file, cb) => {

    // req.body validation
    const validationResult = addCardTextValidator(req.body);
    if(validationResult.hasError) return cb(validationResult.msg, false)

    //file validation
    const validationFileResult = imgFileValidator(file);
    if(validationFileResult.hasError) return cb(validationFileResult.msg, false)

    return cb(null, true)
}

const updateCardFilter = (req, file, cb) => {

    // req.body validation
    const validationResult = updateCardTextValidator(req.body);
    if(validationResult.hasError) return cb(validationResult.msg, false)

    //file validation
    const validationFileResult = imgFileValidator(file);
    if(validationFileResult.hasError) return cb(validationFileResult.msg, false)

    return cb(null, true)
}


module.exports = {
    storage,
    addCardFilter,
    updateCardFilter
}
