import type { ReactNode } from "react";
import { z } from "zod";

export const todoSchema = z.object({
	id: z.number(),
	title: z
		.string()
		.min(1, "タスク名は必須です。")
		.max(150, "タスク名は150文字以内で入力してください。"),
	isDone: z.boolean(),
	createdAt: z.date(),
});

export const createdTodoSchema = z.object({
	title: z
		.string()
		.min(1, "タスク名は必須です。")
		.max(150, "タスク名は150文字以内で入力してください。"),
});

export type Todo = z.infer<typeof todoSchema>;
export type CreatedTodoInput = z.infer<typeof createdTodoSchema>;

export type AddTodoProps = {
	addTodo: (title: string) => void;
};

export type LayoutProps = {
	children: ReactNode;
};

export type TodoListProps = {
	todos: Todo[];
	updateTodo: (id: number, updateParams: Partial<Todo>) => void;
	deleteTodo: (id: number) => void;
};

export type TodoItemProps = {
	todo: Todo;
	updateTodo: (id: number, updateParams: Partial<Todo>) => void;
	deleteTodo: (id: number) => void;
};
