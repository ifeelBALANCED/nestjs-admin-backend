import { UserType } from './user.types';

export type UserResponseInterface = UserType & { token: string };
