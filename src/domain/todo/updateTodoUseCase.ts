import { TodoRepository } from "@/repositories/todoRepository"
import { validateTodo } from "@/utils/validateTodo";

export async function updateTodoUseCase (
    id: number,
    input: {
        title?: string
        is_done?: boolean
    },
    userId: string,
    repository: TodoRepository
): Promise<void>{
    // 存在チェック
    const todo = await repository.findById(id);
    if(!todo) {
        throw new Error("Todoがありません");
    }

    // 権限チェック
    if(todo.created_by !== userId){
        throw new Error("更新権限がありません")
    }

    // タイトルのバリデーションチェック
    if(input.title !== undefined) {
        const { title } = todo;
        const error = validateTodo(title);
        if(error) {
            throw new Error(error);
        }

        const trimmedTitle = title.trim();
        input.title = trimmedTitle;
    }

    // 更新処理
    await repository.update(id, input);
}