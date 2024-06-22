const express = require('express');
const router = express.Router();
const Friendship = require('../Model/Friends');
const User = require('../Model/User');

// Send a friend request
exports.add=async (req, res) => {
    try{
        const { userId, friendId } = req.body;

         const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } }, // $addToSet ensures no duplicates
            { new: true } // Return the updated document
        );

        const friend = await User.findByIdAndUpdate(
            friendId,
            { $addToSet: { friends: userId } }, // $addToSet ensures no duplicates
            { new: true } // Return the updated document
        );
      
        res.status(201).json({message:"useradded",data:user});
    }
    catch(err){
        res.status(500).json({message:"Internal Server error"})
    }
};


// Get list of friends
exports.friendsList=async (req, res) => {
    try{
        const { userId } = req.params;

        const user = await User.findById(userId).populate('friends', 'username email');
        res.status(200).json(user.friends);
    }
    catch(err)
    {res.send({"error":err.message})}
};


