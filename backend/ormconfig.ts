// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { DataSource } from 'typeorm';

const {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  SYNCHRONIZE,
} = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['src/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: SYNCHRONIZE,
});

export default AppDataSource;
