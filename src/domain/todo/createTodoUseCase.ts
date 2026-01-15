'use server';

import { validateTodo } from "@/utils/validateTodo";
import { TodoRepository } from "@/repositories/todoRepository"
/**
 * Todo登録のユースケース
 * - 入力チェック
 * - 登録処理
 * @param todo 
 */
export async function createTodoUseCase(
    todo: { title: string },
    repository: TodoRepository
  ) {
    const { title } = todo
  
    const error = validateTodo(title)
    if (error) {
      throw new Error(error)
    }
  
    await repository.create({
      title,
      is_done: false,
    })
}
