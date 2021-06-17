import { getRepository } from 'typeorm';
import { User } from '../entity/User';


export const UsersController = {

  async getAll() {
    return getRepository(User).find();
  },

  async getByID(id: number) {
    return getRepository(User).findOne({ id });
  },

  async create(user: User) {
    const newUser = getRepository(User).create(user);
    return getRepository(User).save(newUser);
  },

  async update(updateUserData: User) {
    const user = await getRepository(User).findOne(updateUserData.id);
    if (user) {
      getRepository(User).merge(user, updateUserData);
      return getRepository(User).save(user);
    }
    throw new Error('Такого користувача не знайдено');
  },

  async delete(id: string) {
    return getRepository(User).delete(id);
  },

};