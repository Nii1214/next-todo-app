export function validateTodoTitle(title: string): string | null {
    if(!title.trim()) return "Todoを入力してください";
    return null;
}