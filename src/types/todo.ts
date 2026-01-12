export type Todo = {
    id: number;
    title: string;
    is_done: boolean;
  
    // Supabaseのuuid型はTypeScriptではstringとして扱う
    created_by: string;
  
    // SupabaseのtimestampはJSON経由でstringとして返却されるためstring
    // （Dateに変換したい場合は表示用DTOで変換する）
    created_at: string;
  };
  