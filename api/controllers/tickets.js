import {db} from '../connect.js';

export const addTickets = (req, res) => {
    const q = "INSERT INTO tickets(`eventId`, `ticketName`, `ticketPrice`) VALUES ?"
    const values = req.body.map(ticket => [
        ticket.eventId,
        ticket.ticketName,
        ticket.ticketPrice
    ]);

    db.query(q, [values], (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(201).json(result);
    });
};