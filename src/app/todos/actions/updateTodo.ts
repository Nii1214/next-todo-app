"use server";

import { updateTodoUseCase } from "@/domain/todo/updateTodoUseCase";
import { todoRepository } from "@/repositories/todoRepositoryImpl";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateTodoAction(
  id: number,
  input: {
    title?: string;
    is_done?: boolean;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    // ユーザーID取得（認証実装後は実際のユーザーIDを取得）
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || "dummy-user-id";

    await updateTodoUseCase(id, input, userId, todoRepository);

    revalidatePath("/todos");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "更新に失敗しました" };
  }
}