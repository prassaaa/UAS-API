const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
    // Query
    connection.query('SELECT * FROM pembayaran ORDER BY nis ASC', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: rows
            });
        }
    });
});

/**
 * STORE POST
 */
 router.post('/store', [

    //validation
    body('nama').notEmpty(),
    body('tagihan').notEmpty(),
    body('tanggal').notEmpty(),
    body('berita1').notEmpty(),
    body('berita2').notEmpty(),
    body('notes').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        nama: req.body.nama,
        tagihan: req.body.tagihan,
        tanggal: req.body.tanggal,
        berita1: req.body.berita1,
        berita2: req.body.berita2,
        notes: req.body.notes
    }

    // insert query
    connection.query('INSERT INTO pembayaran SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:nis)', function (req, res) {

    let nis = req.params.nis;

    connection.query(`SELECT * FROM pembayaran WHERE nis = ${nis}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found!',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.patch('/update/:nis', [

    //validation
    body('nama').notEmpty(),
    body('tagihan').notEmpty(),
    body('tanggal').notEmpty(),
    body('berita1').notEmpty(),
    body('berita2').notEmpty(),
    body('notes').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //nis post
    let nis = req.params.nis;

    //data post
    let formData = {
        nama: req.body.nama,
        tagihan: req.body.tagihan,
        tanggal: req.body.tanggal,
        berita1: req.body.berita1,
        berita2: req.body.berita2,
        notes: req.body.notes
    }

    // update query
    connection.query(`UPDATE pembayaran SET ? WHERE nis = ${nis}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

});

/**
 * DELETE POST
 */
router.delete('/delete/(:nis)', function(req, res) {

    let nis = req.params.nis;
     
    connection.query(`DELETE FROM pembayaran WHERE nis = ${nis}`, function(err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!',
            })
        }
    })
});

module.exports = router;