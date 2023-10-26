import  express, { json }  from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import fileUpload from "express-fileupload";
import commentRouter from './routes/comments.js';
import groupRouter from './routes/group.js';

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/groups', groupRouter)

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (e) {
        console.log(e)
    }
}

start()

app.listen(process.env.PORT, () => console.log(`Сервер успешно запущен на ${PORT} порту`))