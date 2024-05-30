import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const addInterestedEvent = (req, res) => {
    const token = req.cookies.accessToken;
    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token is invalid!');

        const eventId = parseInt(req.query.eventId);

        const q = "INSERT INTO interests(`userId`, `eventId`) VALUES (?, ?)"
        db.query(q, [userInfo.id, eventId], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(201).json(result);
        })
    })
};

export const getInterestedEvents = (req, res) => {

    const token = req.cookies.accessToken;

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is invalid!');  
        
        const q = "SELECT * FROM interests WHERE `userId` = (?)"

        db.query(q, [userInfo.id], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(200).json(result);
        })
    })
};

export const getInterestedUsers = (req, res) => {
    const q = "SELECT * FROM interests WHERE eventId = (?)"

    const eventId = parseInt(req.query.eventId);
    db.query(q, [eventId], (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(result);
    })
};