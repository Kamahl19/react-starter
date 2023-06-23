import { drop, factory, primaryKey, persist } from '@mswjs/data';

const generateRandomId = () => Math.random().toString().split('.')[1] ?? '';

export const db = factory({
  user: {
    id: primaryKey(generateRandomId),
    email: String,
    password: String,
    isConfirmed: () => true,
  },
});

persist(db);

export const dropDB = () => drop(db);
