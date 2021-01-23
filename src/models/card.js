const {Schema, model} = require("mongoose");

const card = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    titleImg: {
        type: String
    },
    images: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = model('Card', card);
