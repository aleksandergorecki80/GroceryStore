const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const authMid = require('../../middleware/authMid');
const isAdmin = require('../../middleware/isAdmin');



// @route   GET api/admin
// @desc    Get a list of users
// @access  Private, admin only
router.get('/users', authMid, isAdmin, async (req, res) => {

    try {
        const users = await User.find({ _id: { $ne: req.user._id } });
        if(!users){
            res.status(400).json({ msg: 'Users not found' });
        }
        res.send(users)
    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }   
}); 


// @route   DELETE api/admin/:user_id
// @desc    Delete a selected user
// @access  Private, admin only
router.delete('/users/:user_id', authMid, async (req, res) => {
    try {
        
        const result = await User.deleteOne({ _id: req.params.user_id });

        if(result.deletedCount === 0){
            res.status(400).json({ msg: 'Users not found' });
        }

        res.status(200).json({ msg: 'Users deleted' });
    } catch(err) {
        console.log(err.message);
        return res.status(500).send('Server error');
    }
})




module.exports = router;