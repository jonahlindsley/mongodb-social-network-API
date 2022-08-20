// ObjectId() method for converting ThoughtId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const Thought = require('../models/Thought');
const User  = require('../models/User');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json({
            thought,
              // grade: await grade(req.params.thoughtId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new Thought
  createThought(req, res) {
    const newThoughtData = req.body
    Thought.create(newThoughtData)
      .then((thought) => {
        User.findOne({_id: req.params.UserId})
        .then(user => {
          user.thoughts.push(thought._id)
          user.save()
          res.json(user)
        })
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Thought and remove them from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such Thought exists' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought deleted, but no users found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update an existing thought
  updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },
};
