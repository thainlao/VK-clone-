import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    surname: {type: String},
    avatar: { type: String, default: ''},
    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    }]
},
{timestamps: true},)

export default mongoose.model('User', UserSchema)