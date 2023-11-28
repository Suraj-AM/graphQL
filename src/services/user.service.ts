import { Document } from 'mongoose'; // Import the appropriate Mongoose Document type if needed

import User from  '../models/user.model';

const createUser = (userBody: any): Promise<Document> => User.create(userBody);

const getUserByEmail = async (UserEmail: string): Promise<Document | null> => {
  const user = await User.findOne({ email: UserEmail });
  if (!user) {
    throw new Error('User not found!');
  }
  return user;
};

const getUserByMobile = async (UserMobile: string): Promise<Document | null> => {
  const user = await User.findOne({ mobile: UserMobile });
  if (!user) {
    throw new Error('User not found!');
  }
  return user;
};

const getUserByID = (id: string): Promise<Document | null> => User.findById(id);

const updateUserById = async (userId: string, userBody: any): Promise<Document | null> => {
  const user = await getUserByID(userId);
  if (!user) {
    throw new Error('User not found');
  }
  Object.assign(user, userBody);
  await user.save();
  return user;
};

const updatePassword = async (userId: string, body: { oldPassword: string, newPassword: string }): Promise<Document | null> => {
  const user:any = await getUserByID(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (!user.isPasswordMatch(body.oldPassword)) {
    throw new Error('Old password not matched');
  }
  return updateUserById(userId, { password: body.newPassword });
};

export default { createUser, getUserByEmail, getUserByMobile, updateUserById, getUserByID, updatePassword };
