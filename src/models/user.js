const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    avatarURL: String,
    resetToken: String,
    resetTokenExp: Date,

    favoriteList: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Card'
    }]
})


userSchema.methods.addToList = function(card) {
    const items = [...this.favoriteList];
    const candidate = items.every(el => el.toString() !== card._id);
    if(!candidate) items.push(card._id)

    this.favoriteList = items;
    return this.save();
}

userSchema.methods.removeFromList = function(id) {
    let items = [...this.favoriteList];
    this.favoriteList = items.filter(el => el !== id);
    return this.save();
}

userSchema.methods.clearCard = function() {
    this.favoriteList = [];
    return this.save();
}

module.exports = model('User', userSchema);