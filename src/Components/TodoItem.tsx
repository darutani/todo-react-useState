import { type TodoItemProps, createdTodoSchema } from "@/types/todo";
import { Trash2 } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

export default function TodoItem({
	todo,
	updateTodo,
	deleteTodo,
}: TodoItemProps) {
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleIsDone = () => {
		updateTodo(todo.id, { isDone: !todo.isDone });
	};

	const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		updateTodo(todo.id, { title: newTitle });
	};

	const validateTitle = (title: string): boolean => {
		if (error) setError(null);

		const result = createdTodoSchema.safeParse({ title });

		if (!result.success) {
			const formattedError = result.error.format();
			setError(
				formattedError.title?._errors[0] || "入力内容を確認してください。",
			);

			return false;
		}

		return true;
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const title = e.target.value;

		if (!validateTitle(title)) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}
	};

	const handleTrash = () => {
		deleteTodo(todo.id);
	};

	return (
		<div
			className={`flex flex-col p-3 rounded-md shadow-sm transition-colors ${
				todo.isDone
					? "bg-muted text-muted-foreground line-through"
					: "bg-card text-card-foreground hover:bg-muted"
			}`}
		>
			<div className="flex items-center gap-2">
				<Checkbox
					className=""
					checked={todo.isDone}
					onCheckedChange={handleIsDone}
					disabled={!!error}
				/>
				<Input
					ref={inputRef}
					type="text"
					className={`border-none focus:ring-1 focus:ring-input shadow-none ${
						error ? "border-red-500 text-red-500" : ""
					}`}
					value={todo.title}
					onChange={handleTitle}
					onBlur={handleBlur}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className={`text-muted-foreground hover:bg-muted hover:text-foreground ${
						error ? "opacity-50 cursor-not-allowed" : ""
					}`}
					onClick={handleTrash}
					disabled={!!error}
				>
					<Trash2 />
				</Button>
			</div>
			{error && <p className="mt-1 pl-7 text-sm text-red-500">{error}</p>}
		</div>
	);
}
