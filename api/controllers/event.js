import {db} from '../connect.js';


export const addEvent = (req, res) => {

    const q = "INSERT INTO events(`title`, `category`, `type`, `startDate`, `endDate`, `location`, `description`, `free`) VALUES (?)"

    const values = [
        req.body.title, 
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
}