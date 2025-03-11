import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // Create the connection to datasource
  const AppDataSource = await new DataSource({
    type: 'postgres',
    synchronize: true,
    port: config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.dbName'),
  }).initialize();

  // Drop all tables
  await AppDataSource.dropDatabase();

  // Close the connection
  await AppDataSource.destroy();
}
