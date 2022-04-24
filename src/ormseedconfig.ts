import { ConnectionOptions } from 'typeorm';
import ormConfig from './ormconfig';

const ormSeedConfig: ConnectionOptions = {
  ...ormConfig,
  migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/seeds',
  },
};

export default ormSeedConfig;
