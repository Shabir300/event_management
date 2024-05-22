import { db } from "../connect.js";
import jwt from 'jsonwebtoken';


export const getUser = (req, res) => {
    const token = req.cookies.accessToken;

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token is invalid!');

        const q = "SELECT * FROM users WHERE id = (?)"

        db.query(q, [userInfo.id], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(200).json(result);
        })
    })
}