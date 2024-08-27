import { TNullable } from '../../../types/advanced.types';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';
import { CommentEntity } from '../../../core/entities/comment.entity';

const TIMESTAMP = 'CURRENT_TIMESTAMP(6)';
const defaultTimestamp = () => TIMESTAMP;

@Entity()
export class Comment extends CommentEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@Column({ default: 0 })
	likes: number;

	@Column({ default: 0 })
	dislikes: number;

	@ManyToOne(() => User, ({ comments }) => comments)
	@JoinTable({ name: 'authorId' })
	authorId: number;

	@ManyToOne(() => Article, ({ comments }) => comments)
	@JoinTable({ name: 'articleId' })
	articleId: number;

	@OneToMany(() => Comment, ({ commentParentId }) => commentParentId)
	comments: Comment[];

	@ManyToOne(() => Comment, ({ comments }) => comments)
	commentParentId: number;

	@CreateDateColumn({ type: 'timestamp', default: defaultTimestamp })
	createdAt: Date;

	@CreateDateColumn({ type: 'timestamp', default: defaultTimestamp, onUpdate: TIMESTAMP })
	updatedAt: TNullable<Date>;
}
