
const { ObjectId } = require('mongoose').Types;
const {Thought} = require('../models/Thought');
const User = require('../models/User');


module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.UserId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'user and Thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend({params}, res) {
    User.findOneAndUpdate(
      { _id: params.UserId },
      { $pull: {friends: params.friendsId} },
      {new: true}
    )
      .then((user) => {
        console.log(user)
        if (!user){
          res.status(404).json({ message: 'No user with this id!' })
          return;
        }
         res.json(user)})
      .catch((err) => res.status(500).json(err));
  },
  addFriend({params}, res) {
    User.findOneAndUpdate(
      { _id: params.UserId },
      { $addToSet: {friends: params.friendsId} },
      {new: true }
    )
      .then((user) => {
        if (!user){
           res.status(404).json({ message: 'No user with this id!' })
           return;
         }res.json(user)})
      .catch((err) => res.status(500).json(err));
},
};
