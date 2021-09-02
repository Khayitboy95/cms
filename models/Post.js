const { Schema, model } = require('mongoose');


const PostSchema = new Schema({
    user:  {

    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    file: {
        type: String
    }
});


module.exports = model('posts', PostSchema);