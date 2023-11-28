import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import privates from './plugins/private.plugin';
import softDelete from './plugins/softDelete.plugin';

export interface User extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value: any) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    }
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
    minlength: 6,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error("Password must contain at least one letter and one number");
      }
    },
  },
});

// Define methods for the User schema
userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this as User;
  return bcrypt.compare(password, user.password);
};

// Define middleware for pre-save hook
userSchema.pre<User>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Apply plugins for the schema (if available)
userSchema.plugin(privates);
userSchema.plugin(softDelete);

const UserModel: Model<User> = model<User>('User', userSchema);

export default UserModel;




