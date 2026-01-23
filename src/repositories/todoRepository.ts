import { Todo } from "@/types/todo";


type CreateTodoParam = Pick<Todo, "title" | "is_done">;

/**
 * 新規登録
 * @param param 
 */
export interface TodoRepository {
  create(input: {
    title: string
    is_done: boolean
  }): Promise<void>

  findByUserId(userId: string): Promise<Todo[]>;
  findById(id: number): Promise<Todo | null>;

  update(id: number, input: {
    title?: string
    is_done?: boolean
  }): Promise<void>
}