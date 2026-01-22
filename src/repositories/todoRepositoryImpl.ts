// src/repositories/todoRepositoryImpl.ts
import { createClient } from "@/lib/supabase/server"
import { TodoRepository } from "./todoRepository"
import { Todo } from "@/types/todo";

export const todoRepository: TodoRepository = {
  async create(input) {
    const supabase = await createClient();
    const { error } = await supabase.from("todos").insert(input);
    if (error) {
      throw error;
    }
  },
  /**
    async =  非同期関数（awaitが使える）
    : Promise<Todo[]> = 戻り値の型（Todo配列のPromise）
    
    Promise：
      Promiseとは？
      Promiseは「約束」という意味で、将来的に値が返ってくることを約束するオブジェクトです。処理が完了するまで時間がかかる場合（データベースへのアクセス、API呼び出しなど）に使用されます。
      Promiseの3つの状態
      - Pending（待機中）: 処理がまだ完了していない
      - Fulfilled（成功）: 処理が正常に完了した
      - Rejected（失敗）: 処理がエラーで終了した
  */

  /**
   * ユーザーIDに紐づくTodoリストを取得する
   * @param userId - 取得対象のユーザーID
   * @returns - Todo配列(新しい順)
   * @throws - supabaseのエラー
   */
  async findByUserId(userId: string): Promise<Todo[]> {
    // supabaseクライアントを取得
    const supabase = await createClient();
    // 分割代入でdataとerrorを取得
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * IDに紐づくTodoリストを取得する
   * @param userId - 取得対象のID
   * @returns - Todo配列
   * @throws - supabaseのエラー
   */
  async findById(id: number): Promise<Todo | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      // single()を使用: 結果が0件または2件以上の場合はエラーを返す
      .single()
    if (error) throw error;
    return data;
  },
}
