import { db } from "../connect.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
};

export const editUser = (req, res) => {
    const token = req.cookies.accessToken;

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token is invalid!');

        const q = "UPDATE users SET `profilePic` = (?), `name` = (?), `website`  = (?), `company` = (?),  `address` = (?),  `city` = (?),  `country` = (?),  `pincode` = (?),  `phoneNumber` = (?) WHERE id = (?)"

        const values = [
            req.body.profilePic,
            req.body.name,
            req.body.website,
            req.body.company,
            req.body.address,
            req.body.city,
            req.body.country,
            req.body.pincode,
            req.body.phoneNumber,
            userInfo.id
        ]

        db.query(q, values, (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(200).json(result);
        })
    })
};

export const changeEmail = (req, res) => {
    const token = req.cookies.accessToken;

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token is invalid!');

        const q = "UPDATE users SET `email` = (?) WHERE id = (?)"

        db.query(q, [req.body.email, userInfo.id], (err, result) => {
            if(err) return res.status(500).json(err);
            res.status(200).json(result);
        })
    })
};

export const changePassword = (req, res) => {
    const token = req.cookies.accessToken;

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token is invalid!');

        const q = "SELECT * FROM users WHERE id = (?)"

        db.query(q, [userInfo.id], (err, userData) => {
            if(err) return res.status(500).json(err);
            
            const user = userData && userData[0];

            // now compare passwords

            const checkPassword = bcrypt.compareSync(req.body.currentPassword, user.password);

            if(!checkPassword) return res.status(403).json('Current password is incorrect!');

            // now if current pass is ok then generate hashed pass and insert into database

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);

            const q = "UPDATE users SET `password` = (?) WHERE id = (?)"

            db.query(q, [hashedPassword, user.id], (err, result) => {
                if(err) return res.status(500).json(err);
                res.status(201).json(result);
            })

        })
    })
};
