import { describe, it, expect } from "vitest";
import { validateTodo } from "./validateTodo";

/**
⚫︎describe
テスト対象の単位
「この関数についてのテストですよ」というグループ
*/
 
/**
⚫︎it
仕様を日本語で書く場所
ここが「設計書の代わり」になる
*/

/**
⚫︎expect + toThrow
・「実行した結果」ではなく「実行したときの挙動」を検証する
・validateTodo("") X
・() => validateTodo("") ◯
*/

describe("validateTodo",() => {
    it("正常なタイトルの場合 null を返す", () => {
        expect(validateTodo("買い物に行く")).toBeNull();
    });

    it("空文字の場合、エラーメッセージを返す", () => {
        expect(validateTodo("")).toBe("Todoを入力してください");
    });

    it("空白のみの場合、エラーメッセージを返す", () => {
        expect(validateTodo("   ")).toBe("Todoを入力してください");
    });

    it("前後に空白があっても有効な文字があれば null を返す", () => {
        expect(validateTodo("  買い物 ")).toBeNull();
    });

    it("50文字以内の場合、エラーを返さない", () => {
        const title = "a".repeat(50);
        expect(validateTodo(title)).toBeNull();
    });
    
    it("51文字以上の場合、エラーメッセージを返す", () => {
        const title = "a".repeat(51);
        expect(validateTodo(title)).toBe("Todoは50文字以内で入力してください");
    });
});