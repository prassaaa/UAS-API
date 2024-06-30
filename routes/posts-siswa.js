const express = require('express');
const router = express.Router();

//import database
const connection = require('../config/database');

/**
 * SHOW POST BY nis
 */
router.get('/:nis', function (req, res) {
    const postnis = req.params.nis;
    // Query
    connection.query('SELECT * FROM pembayaran WHERE nis = ?', [postnis], function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Post Not Found',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Post Found',
                data: rows[0]
            });
        }
    });
});

module.exports = router;