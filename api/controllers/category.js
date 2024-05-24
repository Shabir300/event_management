import {db} from '../connect.js'

export const getCategories = (req, res) => {

    const q = "SELECT * FROM categories"
    db.query(q, (err, result) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json('Internal server/database error!');
        }
        res.status(200).json(result);
    });
};

