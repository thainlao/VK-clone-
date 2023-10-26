import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from '../models/User.js';

export const createComment = async (req, res) => {
    try {
        const {postId, comment, userId} = req.body
        if (!comment) {
            res.json({ message: 'Нет комментария.' })
        }
        const author = await User.findById(userId);
        if (!author) {
            res.json({ message: 'Пользователь не найден.' });
            return;
        }

        const newComment = new Comment({ comment, author: author._id });
        await newComment.save()

        const post = await Post.findById(postId);
        if (!post) {
            res.json({ message: 'Пост не найден.' });
        }
        
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id }
            });
        } catch (e) {
            console.log(e)
            res.json({ message: 'Произошла ошибка при создании комментария.' });
        }

        res.json(newComment)
    } catch (e) {
        res.json({ message: 'Что то пошло не так.' });
    }
}
