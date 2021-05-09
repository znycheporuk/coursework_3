import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'admin' | 'manager' | 'user'
}

export interface IModel extends Model<UserAttributes, Optional<UserAttributes, 'id'>>, UserAttributes {
  createdAt: Date;
  updatedAt: Date;
}

const User = sequelize.define<IModel>('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  });

(async () => {
  await User.sync();
})();

export default User;
