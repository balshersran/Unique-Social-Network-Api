import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
}

const usersSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please input valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
    },
);

usersSchema
    .virtual('friendCount')
    // Getter
    // need to return the length of friends on friends list 
    .get(function () {
        return this.friends.length;
    })
// Initialize our User model
const Users = model('users', usersSchema);

export default Users;