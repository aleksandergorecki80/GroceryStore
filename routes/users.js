const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const emailData = config.get('emailData');
const host = config.get('host');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');





// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', async (req, res) => {
    
    const { name, email, password } = req.body;

    try {
        const user = new User({
            name,
            email,
            password
        });
        
        // Encrypting the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await User.create(user);

        // Generating JSON Web Token
        const payload = {
            user: {
                _id: user._id
            }
        }

        jwt.sign(payload, jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;

                // Sending an confirmation email
                const url = `${host}/confirmation/${token}`
                const output = `
                    <p>You created a new accound successfully.</p>
                    <h3>Your data:</h3>
                    <ul>
                        <li>Name: ${req.body.name}</li>
                        <li>Email: ${req.body.email}</li>
                    </ul>
                    <p>Please click the link: <a href="${url}">${url}</a> to confirm your email adress</p>
                `;
                // async..await is not allowed in global scope, must use a wrapper
                async function main() {
                     // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "smtp.live.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                        user: emailData.mailUser,
                        pass: emailData.mailPassword, 
                        },
                    });
                    
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: `www.aleksander-gorecki.com ${emailData.mailUser}`, // sender address
                        to: "a.gorecki1980@gmail.com", // list of receivers
                        subject: "New info from www.grocerystore.com", // Subject line
                        text: "Hello world?", // plain text body
                        html: output, // html body
                    });
                    console.log("Message sent: %s", info.messageId);
                }
                main().catch(console.error);
                const userData = {
                    name,
                    email
                }
                return res.json( { 
                    user: userData,
                    message: 'Check your email to finish registration.'
                });
            });
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route   PUT api/users/confirmation
// @desc    Confirm a user's email adress
// @access  Private
router.put('/confirmation/', async (req, res) => {
    // Verify token
    try {
        const decoded = jwt.verify(req.body.token, jwtSecret);
        const updateUser = await User.updateOne( { _id: decoded.user._id }, {$set: { isConfirmed: true }});
        // Check the user
        if(!updateUser) {
            return res.status(400).json({
                message: "User not found."
            });
        }
        const user = await User.findOne({ _id: decoded.user._id}, { name: 1, email: 1, date: 1, isConfirmed: 1, _id: 0 });
        res.json({ 
            user,
            message: 'User confirmation succeded.'
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;