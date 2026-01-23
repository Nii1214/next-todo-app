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

  /**
   * IDに紐づくTodoを更新する
   * @param id  - 更新対象のID
   * @param input - 画面からのインプット
   * @returns - Todo配列
   * @throws -supabaseのエラー
   */
  async update(id: number,input:{
    title?: string
    is_done?: boolean
  }):Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("todos")
      .update(input)
      .eq("id",id);
    
    if(error) throw error;
  },
}
