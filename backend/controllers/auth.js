import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

export const register = async (req, res) => {
    try {
        const {username, password, name, surname} = req.body;

        const isExist = await User.findOne({username});
        if (isExist) {
            return res.json({message: 'Данный username уже занят'})
        }
        const hashPassword = bcrypt.genSaltSync(3);
        const hash = bcrypt.hashSync(password, hashPassword)

        const newUser = new User({
            username, password: hash, name, surname
        })

        const token = jwt.sign({id: newUser._id,}, process.env.TOKEN, {expiresIn: '30d'})

        await newUser.save();

        res.json({newUser, token, message: 'Новый пользователь успешно создан'})
    } catch (e) {
        return res.json({ message: 'Ошибка при создании пользователя' });
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user) {
            return res.json({message: 'Такого юзера не существует'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
           return res.json({message: 'Пароль неверный'})
        }

        const token = jwt.sign({id: user._id,}, process.env.TOKEN, {expiresIn: '30d'})

        res.json({token, user, message: 'Вы успешно авторизовались'})
    } catch (e) {
        res.status(500).json({ message: 'Ошибка при авторизации' });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({message: 'Такого юзера не существует'})
        }
        
        const token = jwt.sign({id: user._id,}, process.env.TOKEN, {expiresIn: '30d'});
        res.json({user, token})
    } catch (e) {
        res.status(500).json({ message: 'Произошла ошибка' });
    }
}

export const uploadAvatar = async (req, res) => {
    try {
        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const userWithAvatar = await User.findByIdAndUpdate(
                req.userId,
                { avatar: fileName },
                { new: true }
            );

            return res.json(userWithAvatar)
        } else {
            return res.json({ message: 'No avatar file provided' });
        }
    } catch (error) {
        res.json({ message: 'Something went wrong.' });
    }
};

export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        res.json({ message: 'Something went wrong.' });
    }
};

export const getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        res.json({ message: 'User Not Found.' });
      }
  
      res.json(user);
    } catch (error) {
        res.json({ message: 'Something went wrong.' });
    }
  };

