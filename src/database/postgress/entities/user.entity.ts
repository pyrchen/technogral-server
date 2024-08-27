import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Genders, UserEntity, UserRoles } from '../../../core/entities/user.entity';
import { Article } from './article.entity';
import { Comment } from './comment.entity';

const TIMESTAMP = 'CURRENT_TIMESTAMP(6)';
const defaultTimestamp = () => TIMESTAMP;

@Entity()
export class User extends UserEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	readonly login: string;

	@Column({ nullable: true, unique: true })
	nickname: string;

	@Column({ nullable: true })
	birthday: Date;

	@Column({ nullable: true })
	avatar: string;

	@Column({ enum: Genders, default: Genders.NOT_SPECIFIED })
	gender: Genders;

	@Column({ enum: UserRoles, default: UserRoles.NEWBEE })
	role: UserRoles;

	@Column()
	email: string;

	@Column({ default: 0 })
	likes: number;

	@Column({ default: 0 })
	dislikes: number;

	@OneToMany(() => Article, ({ authorId }) => authorId)
	articles: Article[];

	@OneToMany(() => Comment, ({ authorId }) => authorId)
	comments: Comment[];

	@CreateDateColumn({ type: 'timestamp', default: defaultTimestamp })
	readonly createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true, default: null, onUpdate: TIMESTAMP })
	updatedAt: Date;
}
