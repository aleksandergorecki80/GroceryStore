const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const bcypt = require('bcryptjs');


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
        })
        
        // Encrypting the password
        const salt = await bcypt.genSalt(10);
        user.password = await bcypt.hash(password, salt);

        await User.create(user);

        // Generating JSON Web Token
        const payload = {
            user: {
                id: user._id
            }
        }
        jwt.sign(payload, jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                return res.json( { token });
            });          
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;