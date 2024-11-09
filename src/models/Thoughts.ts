import { Schema, Types, model , type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: String;
    createdAt: Date;
    username: String;
    reactions: Schema.Types.ObjectId[];
}

interface IReactions extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: String;
    username: String;
    createdAt: Date;
}

const reactionSchema = new Schema<IReactions> ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const thoughtsSchema = new Schema<IThought> ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
    },
    reactions: [reactionSchema],
}, 
    {
        toJSON: {
            virtuals: true,
        },
    },
);

thoughtsSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

const Thoughts = model('Thoughts', thoughtsSchema);

export default Thoughts;