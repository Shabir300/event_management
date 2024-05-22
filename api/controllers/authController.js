import {db} from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = (req, res) => {

    const q = "SELECT * FROM users where `email` = (?)"

    db.query(q, [req.body.email], (err, result) => {
        if(err) return res.status(500).json(err);
        if(result.length > 0) return res.status(409).json('User already exists!');

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`name`, `email`, `password`) VALUES(?, ?, ?)"

        const values = [
            req.body.name,
            req.body.email,
            hashedPassword
        ]

        db.query(q, values, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json('User registered!')
        })
    })

};

export const loginUser = (req, res) => {
    
    // we have email, and password
    // first will check with email if it exists in database
    // then compare passwords if correct 
    // then restore id of the logged in user as token with jwt
    const q = "SELECT * FROM users WHERE `email` = ?"

    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json('User not found!')
        // now user found, so check password
        // const checkPassword = bcrypt.compareSync(req.body.password, user[0].password);
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({id: data[0].id}, 'secretkey');
        const {password, ...otherData} = data;
        res.cookie('accessToken', token, {httpOnly: true}).status(200).json(otherData);

    })
};

export const logoutUser = (req, res) => {
    res.clearCookie('accessToken').status(200).json('User has been logged Out!')
}