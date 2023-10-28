import Group from "../models/Group.js";
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
    try {
      const { name, description, thema } = req.body;
      const user = await User.findById(req.userId)

      if (req.files) {
        let fileName = Date.now().toString() + req.files.image.name
        const __dirname = dirname(fileURLToPath(import.meta.url))
        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

        const newGroupWithImage = new Group({
            username: user.username,
            name,
            description,
            thema,
            avatar: fileName,
            author: req.userId,
        })

        await newGroupWithImage.save()
        return res.json(newGroupWithImage)
    }

    const newGroupWithoutImg = new Group({
      name,
      description,
      thema,
      avatar: '',
      author: req.userId,
      username: user.username,
    })
      await newGroupWithoutImg.save();
      return res.json(newGroupWithoutImg);
    } catch (error) {
      res.json({ message: 'Failed to create a group' });
    }
};

export const getGroupById = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);
    if (!group) {
      res.json({ message: 'Group Not Found.' });
    }

    res.json(group)
  } catch (e) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const groupId = req.params.id; 
    const userId = req.userId; 

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group Not Found.' });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member of the group.' });
    }

    group.members.push(userId);
    await group.save();

    res.json({ message: 'User has joined the group successfully.' });
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const removeUserFromGroup = async (req, res) => {
  try {
    const groupId = req.params.id; 
    const userId = req.userId; 

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group Not Found.' });
    }

    if (!group.members.includes(userId)) {
      return res.status(400).json({ message: 'User is not a member of the group.' });
    }

    group.members = group.members.filter(memberId => memberId.toString() !== userId);
    await group.save();

    res.json({ message: 'User has been removed from the group.' });
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find()
    if (!groups) {
        res.json({ message: 'groups not found' })
    }
    res.json(groups)
} catch (e) {
    res.json({ message: 'Что-то пошло не так.' })
}
};

export const uploadGroupAvatar = async (req, res) => {
  try {
      if (req.files) {
          let fileName = Date.now().toString() + req.files.image.name
          const __dirname = dirname(fileURLToPath(import.meta.url))
          req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

          const groupWithAvatar = await Group.findByIdAndUpdate(
              req.groupId,
              { avatar: fileName },
              { new: true }
          );

          return res.json(groupWithAvatar)
      } else {
          return res.json({ message: 'No avatar file provided' });
      }
  } catch (error) {
      res.json({ message: 'Something went wrong.' });
  }
};

export const removeGroup = async (req, res) => {
  try {
      const group = await Group.findByIdAndDelete(req.params.id);
      if (!group) {
          res.json({ message: 'Group was not found' })
      }

      res.json({message: 'Group was deleted'})
  } catch (e) {
      res.json({ message: 'Что-то пошло не так.' })
  }
}