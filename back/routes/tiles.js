const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require('../db');
const config = require('../config');

// get tile types
router.get('/', async (req,res) => {
    try {
        const tileTypes = await pool.query(
            'SELECT * FROM tile_type'
        );
        res.status(200).json(tileTypes.rows);
    } catch (err) {
        console.error(err.message);
        res.status(404).json(
            { message: 'Not found' }
        );
    }
});

// get tiles of type & filter
router.get('/tiles/types/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const page = req.query.page || 1;
        const limit = 10;
        if (!req.query.sort && !req.query.way) {
            const tilesOfType = await pool.query(
                //`SELECT tile_uid, title, size, price, pieces_per_meter, images FROM tile WHERE type_uid = $1 OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
                `SELECT title, tile_uid, type_uid, size, price FROM tile WHERE type_uid = $1 OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
                [id]
            );
            res.status(200).json(tilesOfType.rows);
        } else {
            if (req.query.sort == 'price')
                sort = req.query.sort;
            else
                sort = "size->>'width'";
            const way = req.query.way;
            const tilesOfType = await pool.query(
                //`SELECT tile_uid, title, size, price, pieces_per_meter, images FROM tile WHERE type_uid = $1 ORDER BY ${sort} ${way} OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
                `SELECT title, tile_uid, type_uid, size, price FROM tile WHERE type_uid = $1 ORDER BY ${sort} ${way} OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
                [id]
            );
            res.status(200).json(tilesOfType.rows);
        }
    } catch (err) {
        console.error(err.message);
        res.status(404).json(
            { message: 'Not found' }
        );
    }
});

// get one tile
router.get('/tiles/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const tile = await pool.query(
            'SELECT * FROM tile WHERE tile_uid = $1',
            [id]
        );
        res.status(200).json(tile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(404).json(
            { message: 'Not found' }
        );
    }
});

// download catalogue
router.get('/catalogue', async (req,res) => {
    try {
        res.status(200).download('public/contract.pdf');
    } catch (err) {
        console.error(err.message);
        res.status(404).json(
            { message: 'Not found' }
        );
    }
});

// Order request
router.post('/orderrequest', async (req,res) => {
    try {
        const { name, phone, comment, order } = req.body;
        const transporter = nodemailer.createTransport({
            port: config.port,
            port: config.mailPort,
            auth: {
                user: config.mailUser,
                pass: config.mailPass
            }
        });
        let mailOptions = {
            from: 'noreply@pintsakprod.com',
            to: 'pintsak@gmail.com',
            subject: 'New order request!',
            html: 
                `<table>                
                    <tbody>
                        <tr>Customer: ${name}</tr>
                        </br>
                        <tr>Phone: ${phone}</tr>
                        </br>
                        <tr>Comment: ${comment}</tr>
                        </br>
                        <tr>Order: ${order.title}, ${order.count}, ${order.color}, ${order.totalPrice}</tr>
                    </tbody>
                </table>`
        };
        transporter.sendMail(mailOptions, function(err,info) {
            if(err)
                console.log(err);
            else
                console.log('Email sent: ' + info.response);
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json(
            { message: 'Bad request' }
        ); 
    }
});

module.exports = router;