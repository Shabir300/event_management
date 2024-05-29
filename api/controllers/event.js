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

export const getEvent = (req, res) => {
    const q = "SELECT e.*, json_arrayagg(json_object('ticketName', t.ticketName, 'ticketPrice', t.ticketPrice)) as tickets  FROM events as e join tickets as t on t.eventId = e.id WHERE e.id = ?"

    const id = parseInt(req.params.id);

    db.query(q, [id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(result);
    })
};


export const getEventSearch = (req, res) => {
    // console.log('apiiiiiiiii', req.query.startDate);

    let sortBy;

    if (req.query.sortBy === 'Price (high to low)') {
        sortBy = '(SELECT MAX(t2.ticketPrice) from tickets t2 WHERE t2.eventId = e.id) DESC';
    } else if (req.query.sortBy === 'Price (low to high)') {
        sortBy = '(SELECT MAX(t2.ticketPrice) from tickets t2 WHERE t2.eventId = e.id) ASC';
    } else if (req.query.sortBy === 'Start date') {
        sortBy = 'e.startDate ASC'; // Default sorting order
    }

    let filters = ''

    let filteredCategories = [];
    if (req.query.filteredCategories) {
        try {
            filteredCategories = JSON.parse(req.query.filteredCategories);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid filteredCategories format' });
        }
    }

    if (Array.isArray(filteredCategories) && filteredCategories.length > 0) {
        const cats = filteredCategories.map(cat => `'${cat}'`).join(', ');
        filters = `AND e.category IN (${cats})`
    }

    let pricing;

    const price = parseInt(req.query.free);

    if(price === 1) {
        pricing = `AND e.free = 1`
    } else if (price === 0) {
        pricing = `AND e.free = 0`
    } else {
        pricing= ''
    }

    let date = ``;
    
    if(req.query.startDate === 'Today') {
        date = `AND DATE(e.startDate) = CURDATE()`
    } else if (req.query.startDate === 'Week') {
        date = `AND DATE(e.startDate) BETWEEN CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY AND CURDATE() + INTERVAL 6 - WEEKDAY(CURDATE()) DAY`
    } else if (req.query.startDate === 'Month') {
        date = `AND YEAR(e.startDate) = YEAR(CURDATE()) AND MONTH(e.startDate) = MONTH(CURDATE())`
    }

    const q = `SELECT e.id, e.title, e.coverPic, e.category, e.type, e.startDate, e.endDate, e.location, e.description, JSON_ARRAYAGG(JSON_OBJECT('ticket_id', t.id, 'ticketName', t.ticketName, 'ticketPrice', t.ticketPrice)) as tickets FROM events AS e LEFT JOIN tickets AS t ON t.eventId = e.id WHERE e.title LIKE '%${req.query.search}%' AND e.location LIKE '%${req.query.location}%' ${filters} ${pricing} ${date} GROUP BY e.id, e.title, e.coverPic, e.category, e.type, e.startDate, e.endDate, e.location, e.description ORDER BY  ${sortBy} `

    db.query(q, (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(result);
    });

};

