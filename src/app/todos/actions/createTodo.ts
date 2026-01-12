"use server"


import { createTodoUseCase } from "@/domain/todo/createTodoUseCase";
import { revalidatePath } from "next/cache";

export async function createTodoAction (todo: {title:string}) {
    
    await createTodoUseCase(todo);

    // 登録後に一覧を再取得させる
    revalidatePath("/todos");
}



/**
 * 更新処理
 * @param todoId 
 * @param title 
 * @param isDone 
 */
// export async function updateTodoAction (
//     todoId: number,
//     title: string,
//     isDone: boolean
// ){
//     await updateTodo(todoId,{
//         title,
//         is_done: isDone
//     });
// }