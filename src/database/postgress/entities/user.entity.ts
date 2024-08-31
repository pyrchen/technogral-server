import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Genders, UserEntity, UserRoles } from '../../../core/entities/user.entity';
import { Article } from './article.entity';
import { Comment } from './comment.entity';

const TIMESTAMP = 'CURRENT_TIMESTAMP(6)';
const defaultTimestamp = () => TIMESTAMP;

@Entity()
@Unique(['email', 'login'])
export class User extends UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	login: string;

	@Column({ unique: true })
	email: string;

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
