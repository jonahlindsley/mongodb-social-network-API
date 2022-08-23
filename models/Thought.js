
const { Schema, model } = require('mongoose');


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // ref: "thought"
    },
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
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  })





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
    reactions: [reactionSchema]
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  })
  thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema);

module.exports = {Thought, Reaction}

