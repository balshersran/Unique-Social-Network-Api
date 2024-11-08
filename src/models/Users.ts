import { Schema, Types, model, type Document } from 'mongoose';


interface IThoughts extends Document {
    thoughtID: Schema.Types.ObjectId
}

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
}

const thoughtsSchema = new Schema<IThoughts> ({
    thoughtID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    }
})

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
    },
    thoughts: [thoughtsSchema],
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
    return ;
  })  // set number of friends on list to display 
  .set(function () {
    
  });

// Initialize our User model
const Users = model('users', usersSchema);

export default Users;