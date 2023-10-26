import Post from '../models/Post.js';
import User from '../models/User.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import Comment from '../models/Comment.js';

export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })
        res.json(newPostWithoutImage)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().sort('-views')

        if (!posts) {
            res.json({ message: 'Постов нет' })
        }
        res.json({posts, popularPosts})
    } catch (e) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        res.json(post)
    } catch (e) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Проверьте, есть ли у пользователя уже лайк
        const likedIndex = post.likes.indexOf(userId);

        if (likedIndex !== -1) {
            post.likes.splice(likedIndex, 1);
        } else {
            // Если лайка не было, добавляем его
            post.likes.push(userId);
        }

        await post.save();

        return res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const getUserPostById = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            })
        )

        res.json(list)
    } catch (e) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.json({ message: 'Пост не найден.' })
        }
        await User.findByIdAndUpdate(req.userId, {
            $pull: {posts: req.params.id},
        })

        res.json({message: 'Пост был удален'})
    } catch (e) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const getPostComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment);
            })
        )
        res.json(list)
    } catch (e) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}
