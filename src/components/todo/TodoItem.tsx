"use client";

import { useState } from "react";
import { updateTodoAction } from "@/app/todos/actions/updateTodo";
import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  // チェックボックスの切り替え
  const handleToggle = async () => {
    setIsLoading(true);
    await updateTodoAction(todo.id, { is_done: !todo.is_done });
    setIsLoading(false);
  };

  // タイトル編集の保存
  const handleSave = async () => {
    if (title.trim() === "") {
      alert("Todoを入力してください");
      return;
    }
    setIsLoading(true);
    const result = await updateTodoAction(todo.id, { title });
    if (result.success) {
      setIsEditing(false);
    } else {
      alert(result.error);
    }
    setIsLoading(false);
  };

  // 編集モード
  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-2 border rounded">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-2 py-1 border rounded"
          disabled={isLoading}
        />
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          保存
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setTitle(todo.title);
          }}
          disabled={isLoading}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          キャンセル
        </button>
      </div>
    );
  }

  // 表示モード
  return (
    <div className="flex items-center gap-2 p-2 border rounded">
      <input
        type="checkbox"
        checked={todo.is_done}
        onChange={handleToggle}
        disabled={isLoading}
        className="w-5 h-5"
      />
      <span className={todo.is_done ? "line-through text-gray-500" : ""}>
        {todo.title}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        disabled={isLoading}
        className="ml-auto px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        編集
      </button>
    </div>
  );
}