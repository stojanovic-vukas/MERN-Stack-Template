// business.route.js

const express = require('express');
const businessRoutes = express.Router();
const nodemailer = require('nodemailer');

// Require Business model in our routes module
let Business = require('./business.model');

// Send email
businessRoutes.route('/sendemail').post(function (req, res) {
    let email_service = req.body.sender_name.split('@');
    var transporter = nodemailer.createTransport({
        service: email_service[1],
        auth: {
            user: req.body.sender_name,
            pass: req.body.sender_email_passwd
        }
    });
    var mailOptions = {
        from: req.body.sender_name,
        to: req.body.receiver_name,
        subject: req.body.subject,
        text: req.body.contents
    }
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
        {
            res.status(400).send("Unable to send your email");
            console.log(err);
        }
        else
            console.log('Email sent' + info.response);
    })
});

// Define store route
businessRoutes.route('/add').post(function (req, res) {
    let business = new Business(req.body);
    business.save()
        .then(business => {
            res.status(200).json({'business': 'business in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Define get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
    Business.find(function(err, businesses) {
        if(err)
            console.log(err);
        else
            res.json(businesses);
    });
});

// Define edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Business.findById(id, function (err, business){
        if (err)
            console.log(err);
        else
            res.json(business);
    });
});

// Define update route
businessRoutes.route('/update/:id').post(function (req, res){
    Business.findById(req.params.id, function(err, business){
        if (!business)
            res.status(404).send('data is not found');
        else {
            business.person_name = req.body.person_name;
            business.business_name = req.body.business_name;
            business.business_gst_number = req.body.business_gst_number;

            business.save().then(business => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

// Define delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function (err, business){
        if (err)
            res.json(err);
        else
            res.json("Successfully removed");
    });
});

module.exports = businessRoutes;