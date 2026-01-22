import { Todo } from "@/types/todo";


type CreateTodoParam = Pick<Todo, "title" | "is_done">;

/**
 * 新規登録
 * @param param 
 */
export interface TodoRepository {
    create(input: {
      title: string
      is_done: boolean
    }): Promise<void>

    findByUserId(userId: string) : Promise<Todo[]>;
    findById(id: number) : Promise<Todo | null>;
}

/**
 * 更新
 * @param todoId 
 * @param param 
 */
// export async function updateTodo (
//     todoId: number,
//     // 質問：これの詳細を教えて
//     param: Pick<Todo, "title" | "is_done">
// ){  
//     // Supabaseのサーバ情報を取得？
//     const supabase = await createClient();

//     // 更新処理を実行
//     const { error } = await supabase
//         .from('todos')
//         .update(param)
//         .eq("id",todoId);
    
//     if(error) {
//         throw new Error(error.message);
//     }
// }

