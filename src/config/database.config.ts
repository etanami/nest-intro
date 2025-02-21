import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  dbName: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  autoLoadEntities: process.env.autoLoad === 'true' ? true : false,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
}));
