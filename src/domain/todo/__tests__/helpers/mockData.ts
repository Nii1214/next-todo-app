import { Todo } from "@/types/todo";

export function createMockTodo(overrides?: Partial<Todo>): Todo {
    return {
        id: 1,
        title:"デフォルトTodo",
        is_done: false,
        created_by: "user-123",
        created_at: "2024-01-01T10:00:00Z",
        ...overrides,
    };
}