import { Schema, model} from 'mongoose'
import { IUser } from '../types'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: String,
    last_name: String,
})

userSchema.plugin(passportLocalMongoose, 
    {
        usernameField: 'email',
        hashField: 'password'
    }
)

userSchema.set('toJSON', {
    transform: (_document, returnedObject: any) => {
        delete returnedObject.__v
        delete returnedObject.password
        delete returnedObject.salt   
    }
})

const User = model<IUser>('User', userSchema)

export default User