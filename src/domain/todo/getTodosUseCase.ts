import { TodoRepository } from "@/repositories/todoRepository";
import { Todo } from "@/types/todo";

/**
 * Todo一覧取得のユースケース
 * - ユーザーIDでフィルタリング
 * - 作成日時降順でソート
 */
export async function getTodosUseCase (
    userId: string,
    repository: TodoRepository
): Promise<Todo[]> {
    const todos = await repository.findByUserId(userId);

    // 作成日時で降順ソート
    return todos.sort((a , b) => {
        const dataA = new Date(a.created_at).getTime();
        const dataB = new Date(b.created_at).getTime();
        return dataB-dataA;
    });
}