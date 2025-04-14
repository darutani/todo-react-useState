import { type AddTodoProps, createdTodoSchema } from "@/types/todo";
import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AddTodo({ addTodo }: AddTodoProps) {
	const [title, setTitle] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleAddTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = createdTodoSchema.safeParse({ title });
		if (!result.success) {
			const formattedErrors = result.error.format();
			setError(
				formattedErrors.title?._errors[0] || "入力内容を確認してください。",
			);
			return;
		}

		addTodo(title);
		setTitle("");
		setError(null);
	};

	return (
		<div className="p-6">
			<form className="w-full" onSubmit={handleSubmit}>
				<div className="flex w-full flex-col">
					<div className="flex w-full items-center space-x-2">
						<Input
							type="text"
							onChange={handleAddTitle}
							value={title}
							className={error ? "border-red-500" : ""}
						/>
						<Button type="submit" className="">
							追加
						</Button>
					</div>
					<div>
						{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
					</div>
				</div>
			</form>
		</div>
	);
}
