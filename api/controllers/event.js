import {db} from '../connect.js';
import jwt from 'jsonwebtoken';

export const addEvent = (req, res) => {

    const token = req.cookies.accessToken;
    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token is invalid!');

        const q = "INSERT INTO events(`title`, `userId`, `category`, `type`, `startDate`, `endDate`, `location`, `description`, `free`) VALUES (?)"
    
        const values = [
            req.body.title, 
            userInfo.id,
            req.body.category, 
            req.body.type, 
            req.body.startDate, 
            req.body.endDate, 
            req.body.location, 
            req.body.description, 
            req.body.free,
        ];
    
        db.query(q, [values], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(201).json(result);
        })
    })
};


export const getEventSearch = (req, res) => {

    const q = `SELECT * FROM events WHERE title LIKE '%${req.query.search}%'`

    db.query(q, (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(result);
    });

};

