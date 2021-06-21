import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Notarius } from '../entity/Notarius';
import { IPowerOfAttorney } from '../lib/types';
import { PowerOfAttorney } from '../entity/PowerOfAttorney';
import { NotariusController } from './NotariusController';


export const PowerOfAttorneyController = {

  async getAll() {
    const PoAs = await getRepository(PowerOfAttorney).find();
    const notaries = await getRepository(Notarius).find();
    return PoAs.map((PoA) => (
        { ...PoA, notarius: notaries.find(notarius => PoA.notariusId === notarius.id) }
      ),
    );
  },

  async getByID(id: number) {
    return getRepository(PowerOfAttorney).findOne({ id });
  },

  async getBySerialNumber(series: string, number: number) {
    const PoA = await getRepository(PowerOfAttorney).findOne({ series, number });
    if (!PoA) {
      return false;
    }
    const notarius = await NotariusController.getByID(PoA.notariusId);
    return { ...PoA, notarius: notarius };
  },


  async create(PoA: IPowerOfAttorney) {
    const newPoA = await getRepository(PowerOfAttorney).create(PoA);
    return await getRepository(PowerOfAttorney).save(newPoA);
  },

  async update(updatePoAData: Partial<IPowerOfAttorney>) {
    const PoA = await getRepository(PowerOfAttorney).findOne(updatePoAData.id);
    if (PoA) {
      getRepository(PowerOfAttorney).merge(PoA, updatePoAData);
      return getRepository(PowerOfAttorney).save(PoA);
    }
    throw new Error('Такої довіреності не знайдено');
  },

};