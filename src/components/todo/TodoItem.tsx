import { Todo } from "@/types/todo"

type Props = {
    todo: Todo;
}

export default function TodoItem({todo}: Props) {
    return (
        <div className="flex items-center gap p-4 bg-white rouded-lg shadow hover-md transition">
            <input
                type="checkbox"
                checked={todo.is_done}
                readOnly
                className="w-5 h-5 cursor-pointer"
            />
            <span className={`flex-1 ${todo.is_done ? "line-through text-gray-400" : "text-gray-800"}`}>
                {todo.title}
            </span>
            <span className="text-xs text-gray-400">
                {new Date(todo.created_at).toLocaleDateString("ja-JP")}
            </span>
        </div>
    );
}