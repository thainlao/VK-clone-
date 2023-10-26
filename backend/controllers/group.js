import Group from "../models/Group.js";
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
    try {
      const { name, description, thema } = req.body;

      if (req.files) {
        let fileName = Date.now().toString() + req.files.image.name
        const __dirname = dirname(fileURLToPath(import.meta.url))
        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

        const newGroupWithImage = new Group({
            name,
            description,
            thema,
            avatar: fileName,
            author: req.userId,
        })

        await newGroupWithImage.save()
        return res.json(newPostWithImage)
    }

    const newGroupWithoutImg = new Group({
      name,
      description,
      thema,
      avatar: '',
      author: req.userId,
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
  const { groupId, userId } = req.body;
  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.json({ message: 'Group not found' });
    }

    if (group.members.includes(userId)) {
      return res.json({ message: 'You are already a member of this group' });
    }

    group.members.push(userId);
    await group.save();

    return res.json({ message: 'Joined the group successfully' });
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};

export const removeUserFromGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.json({ message: 'Group not found' });
    }

    if (!group.members.includes(userId)) {
      return res.json({ message: 'You are not a member of this group' });
    }

    group.members = group.members.filter(memberId => memberId.toString() !== userId);
    await group.save();

    return res.json({ message: 'Left the group successfully' });
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