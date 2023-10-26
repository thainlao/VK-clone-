import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN);
            req.userId = decoded.id
            next()
        } catch (e) {
            return res.json({message: 'Нет досутпа'})
        }
    } else {
        return res.json({message: 'Нет досутпа'})
    }
}