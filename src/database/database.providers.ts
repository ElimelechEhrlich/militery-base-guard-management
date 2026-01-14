import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from '../users/usersDto/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'apppass',
        database: 'nest_app',
      });
      sequelize.addModels([UserEntity])
      await sequelize.sync()
      return sequelize
    }
  }
]
