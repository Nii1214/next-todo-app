"use client";

import { useState } from "react";
import { createTodoAction } from "@/app/todos/actions/createTodo";
import Message from "@/components/common/Message";
import { useMessage } from "@/hooks/useMessage";

export default function TodoCreateForm() {

    const [title, setTitle] = useState("");
    const { message, showMessage, clearMessage } = useMessage();

    async function handleCreate() {
        clearMessage();
        // trim:文字列の前後にある空白を削除する
        if (!title.trim()) {
            showMessage("Todo を入力してください", "info");
            return;
        }

        try {
            await createTodoAction({ title });
            showMessage("✅ 登録が完了しました", "success");
            setTitle("");
        } catch (error) {
            const message = error instanceof Error ? error.message : "予期しないエラーが発生しました";
            showMessage(`❌ 登録に失敗しました: ${message}`, "error");
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="flex gap-3">
                <input
                    type="text"
                    name="title"
                    placeholder="Todoを入力"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button onClick={handleCreate}>登録</button>
            </div>
            {/* 　messageがnullでない時だけ<Message>を表示する */}
            {message && (<Message text={message.text} type={message.type} />)}
        </div>
    );
}