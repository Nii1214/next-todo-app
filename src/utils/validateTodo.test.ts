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
    it("空文字の場合、エラー文字列を返す", () => {
        expect(validateTodo("")).toBe("Todoを入力してください");
    });
    it("空白のみの場合、エラー文字列を返す", () => {
        expect(validateTodo("   ")).toBe("Todoを入力してください");
    });
    it("正常なタイトルの場合、nullを返す", () => {
        expect(validateTodo("買い物に行く")).toBeNull();
    });
});