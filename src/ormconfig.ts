import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: String(process.env.ORM_HOST),
  port: Number(process.env.ORM_PORT),
  username: String(process.env.ORM_USERNAME),
  password: String(process.env.ORM_PASSWORD),
  database: String(process.env.ORM_DATABASE),
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default ormConfig;
