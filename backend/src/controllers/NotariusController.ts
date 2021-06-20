import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Notarius } from '../entity/Notarius';
import { INotarius, IRegisterNotarius } from '../lib/types';


export const NotariusController = {

  async getAll() {
    const users = await getRepository(User).find();
    const notaries = await getRepository(Notarius).find();
    return notaries.map((notarius) => (
        { ...notarius, ...users.find(user => user.id === notarius.id) }
      ),
    );
  },

  async getByID(id: string) {
    const user = await getRepository(User).findOne({ id });
    const notarius = await getRepository(Notarius).findOne({ id });
    return { ...user, ...notarius };
  },

  async create(notariusData: IRegisterNotarius & { hash: string, salt: string }) {
    const newUser = await getRepository(User).create({
      ...notariusData,
      role: 'notarius',
    });
    const user = await getRepository(User).save(newUser);

    const notarius = await getRepository(Notarius).create({
      ...notariusData,
      id: user.id,
      active: true,
    });
    return getRepository(Notarius).save(notarius);

  },

  async update(updateNotariusData: Partial<INotarius>) {
    const notarius = await getRepository(Notarius).findOne(updateNotariusData.id);
    if (notarius) {
      getRepository(Notarius).merge(notarius, updateNotariusData);
      return getRepository(Notarius).save(notarius);
    }
    throw new Error('Такого користувача не знайдено');
  },

  async delete(id: string) {
    return getRepository(User).delete(id);
  },

};