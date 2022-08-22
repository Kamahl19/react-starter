import { drop, factory, primaryKey } from '@mswjs/data';

export const db = factory({
  user: {
    id: primaryKey(() => Math.random().toString()),
    email: String,
    password: String,
    isConfirmed: () => true,
  },
});

export const dropDB = () => drop(db);
