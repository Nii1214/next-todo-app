export function validateTodo(title: string): string | null {

    const trimmedTitle = title.trim();

    // 必須チェック
    if(!trimmedTitle){
        return "Todoを入力してください";
    }
    
    // 50文字制限
    if(trimmedTitle.length > 50) {
        return "Todoは50文字以内で入力してください"
    }

    return null;
}