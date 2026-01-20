import { Todo } from "@/types/todo"
import TodoItem from "./TodoItem";

type Props = {
    todos: Todo[];
};

export default function TodoList({ todos } : Props) {
    if(todos.length === 0) {
        <div className="text-center py-8 text-gray-500">
            <p className="text-lg">◽️Todoがありません</p>
            <p className="text-sm mt-2">新しいTodoを作成してください</p>
        </div>
    }

    return (
        <div className="mt-6 space-y-2">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}