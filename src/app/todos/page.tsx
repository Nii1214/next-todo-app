import TodoCreateForm from "@/components/todo/TodoCreateForm";
import TodoList from "@/components/todo/TodoList";
import { getTodosUseCase } from "@/domain/todo/getTodosUseCase";
import { createClient } from "@/lib/supabase/server";
import { todoRepository } from "@/repositories/todoRepositoryImpl";

export default async function TodoPage() {
    // 認証チェック
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    // 仮のユーザーID
    const userId = user?.id || "00000000-0000-0000-0000-000000000000";
    // Todo一覧を取得
    const todos = await getTodosUseCase(userId,todoRepository);
    return (
        <div>
            <h1>Todo一覧</h1>
            <TodoCreateForm />
            <TodoList todos={todos} />
        </div>
    )
}