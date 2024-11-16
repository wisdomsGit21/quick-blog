import * as migration_20241115_090918_init from './20241115_090918_init';
import * as migration_20241115_094207_init_2 from './20241115_094207_init_2';
import * as migration_20241115_101909_init_2 from './20241115_101909_init_2';

export const migrations = [
  {
    up: migration_20241115_090918_init.up,
    down: migration_20241115_090918_init.down,
    name: '20241115_090918_init',
  },
  {
    up: migration_20241115_094207_init_2.up,
    down: migration_20241115_094207_init_2.down,
    name: '20241115_094207_init_2',
  },
  {
    up: migration_20241115_101909_init_2.up,
    down: migration_20241115_101909_init_2.down,
    name: '20241115_101909_init_2'
  },
];
