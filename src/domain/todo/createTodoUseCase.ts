'use server';

import { createTodo } from "@/repositories/todoRepository";
import { validateTodoTitle } from "@/utils/validateTodo";
import { revalidatePath } from "next/cache";

/**
 * Todo登録のユースケース
 * - 入力チェック
 * - 登録処理
 * @param todo 
 */
export async function createTodoUseCase(todo: {title: string}) {
    const {title} = todo;

    // バリデーション
    const error = validateTodoTitle(title);
    if(error){
        throw new Error(error);
    }

    // 登録
    await createTodo({
        title,
        is_done: false,
    });

    revalidatePath("/todos");
}