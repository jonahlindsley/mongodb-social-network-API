
const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        timestamps: true
    },
    username: {
        type: String,
        required: true,
        // refrences the user that made it 
    },
    reactions: []
})

const reactionSchema = new Schema({

    reactionId: Schema.Types.ObjectId,
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        timestamps: true
    }
})

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  });


const Thought = model('Thought', thoughtSchema);

module.exports = Thought

