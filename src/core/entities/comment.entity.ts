import { TNullable } from '../../types/advanced.types';

export abstract class CommentEntity {
	id: number;
	authorId: number;
	articleId: number;
	text: string;
	likes: number;
	dislikes: number;
	createdAt: Date;
	updatedAt: TNullable<Date>;
}
