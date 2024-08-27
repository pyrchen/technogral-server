import { TNullable } from '../../types/advanced.types';

const TIMESTAMP = 'CURRENT_TIMESTAMP(6)';
const defaultTimestamp = () => TIMESTAMP;

export enum UserRoles {
	NEWBEE,
	AMATEUR,
	EXPERIENCED,
	EXPERT,
	SPECIALIST,
	ADMIN,
	AUTHOR,
}

export enum Genders {
	NOT_SPECIFIED,
	MAN,
	WOMAN,
}

export abstract class UserEntity {
	readonly id: number;
	readonly login: string;
	nickname: TNullable<string>;
	avatar: TNullable<string>;
	birthday: TNullable<Date>;
	gender: Genders;
	role: UserRoles;
	email: string;
	likes: number;
	dislikes: number;
	readonly createdAt: Date;
	updatedAt: TNullable<Date>;
}
