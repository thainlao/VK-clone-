import mongoose from "mongoose";

const GroupsSchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String },
        thema: { type: String },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        avatar: { type: String, default: ''},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, {timestamps: true},
)

export default mongoose.model('Group', GroupsSchema)