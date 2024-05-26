import {db} from '../connect.js';
import jwt from 'jsonwebtoken';

export const addEvent = (req, res) => {

    const token = req.cookies.accessToken;
    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token is invalid!');

        const q = "INSERT INTO events(`title`, `userId`, `category`, `type`, `startDate`, `endDate`, `location`, `description`, `free`, `coverPic`) VALUES (?)"
    
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
            req.body.coverPic
        ];
    
        db.query(q, [values], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(201).json(result);
        })
    })
};


export const getEventSearch = (req, res) => {

    let sortBy;

    if (req.query.sortBy === 'Price (high to low)') {
        sortBy = '(SELECT MAX(t2.ticketPrice) from tickets t2 WHERE t2.eventId = e.id) DESC';
    } else if (req.query.sortBy === 'Price (low to high)') {
        sortBy = '(SELECT MAX(t2.ticketPrice) from tickets t2 WHERE t2.eventId = e.id) ASC';
    } else if (req.query.sortBy === 'Start date') {
        sortBy = 'e.startDate ASC'; // Default sorting order
    }


    const q = `SELECT e.id, e.title, e.coverPic, e.category, e.type, e.startDate, e.endDate, e.location, e.description, JSON_ARRAYAGG(JSON_OBJECT('ticket_id', t.id, 'ticketName', t.ticketName, 'ticketPrice', t.ticketPrice)) as tickets FROM events AS e LEFT JOIN tickets AS t ON t.eventId = e.id WHERE e.title LIKE '%${req.query.search}%' AND e.location LIKE '%${req.query.location}%' GROUP BY e.id, e.title, e.coverPic, e.category, e.type, e.startDate, e.endDate, e.location, e.description ORDER BY  ${sortBy}`

    db.query(q, (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(result);
    });

};

