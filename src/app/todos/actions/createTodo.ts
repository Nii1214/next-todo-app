"use server"


import { createTodoUseCase } from "@/domain/todo/createTodoUseCase";
import { revalidatePath } from "next/cache";
import { todoRepository } from "@/repositories/todoRepositoryImpl";

export async function createTodoAction(todo: { title: string }) {
    await createTodoUseCase(todo, todoRepository);
    // 登録後に一覧を再取得させる
    revalidatePath("/todos");
}