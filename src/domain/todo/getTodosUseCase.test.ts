import { TodoRepository } from "@/repositories/todoRepository";
import { Todo } from "@/types/todo";
import { describe, expect, it, vi } from "vitest";
import { getTodosUseCase } from "./getTodosUseCase";

// テスト実行：npm run test src/domain/todo/getTodosUseCase.test.ts

// テストのグループ化
describe("getTodosUseCase", () => {
    it("ユーザーのTodo一覧を表示できる", async () => {
        // モックデータ
        const mockTodos: Todo[] = [
            {
                id: 1,
                title: "Todo 1",
                is_done: false,
                created_by: "user-123",
                created_at: "2024-01-01T10:00:00Z",
            },
            {
                id: 2,
                title: "Todo 2",
                is_done: true,
                created_by: "user-123",
                created_at: "2024-01-02T10:00:00Z",
            },
        ];

        // モックRepository
        const mockRepository: TodoRepository = {
            // vi = Vitestのモック機能  vi.fn() = モック関数を作成
            create: vi.fn(),
            findByUserId: vi.fn().mockResolvedValue(mockTodos),
            findById: vi.fn(),
        };

        // 実行
        const result = await getTodosUseCase("user-123", mockRepository);

        // 検証
        // result配列の長さが2であるか
        expect(result).toHaveLength(2);
        // resultの並び順が作成日時：降順になっているか
        expect(result[0].title).toBe("Todo 2");
        // 正しい引数でリポジトリが呼ばれているか
        expect(mockRepository.findByUserId).toHaveBeenCalledWith("user-123");
    });

    it("作成日時順でソートされる", async () => {
        const mockTodos: Todo[] = [
            {
                id: 1,
                title: "古いTodo",
                is_done: false,
                created_by: "user-123",
                created_at: "2024-01-01T10:00:00Z",
            },
            {
                id: 2,
                title: "新しいTodo",
                is_done: false,
                created_by: "user-123",
                created_at: "2024-01-03T10:00:00Z",
            },
            {
                id: 3,
                title: "中間のTodo",
                is_done: false,
                created_by: "user-123",
                created_at: "2024-01-02T10:00:00Z",
            },
        ];

        const mockRepository: TodoRepository = {
            create: vi.fn(),
            findByUserId: vi.fn().mockResolvedValue(mockTodos),
            findById: vi.fn(),
        }

        const result = await getTodosUseCase("user-123", mockRepository);

        // 新しい順に並んでいることを確認
        expect(result[0].title).toBe("新しいTodo");
        expect(result[1].title).toBe("中間のTodo");
        expect(result[2].title).toBe("古いTodo");
        expect(mockRepository.findByUserId).toHaveBeenCalledWith("user-123");
    });

    it("Todoがない場合は空配列を返す", async () => {
        const mockRepository: TodoRepository = {
            create: vi.fn(),
            findByUserId: vi.fn().mockResolvedValue([]),
            findById: vi.fn(),
        };

        const result = await getTodosUseCase("user-123", mockRepository);

        expect(result).toEqual([]);
        expect(mockRepository.findByUserId).toHaveBeenCalledWith("user-123");
    });

    it("同じ作成日時の場合、元の順序を維持する(安定ソート)", async() => {
        const mockTodos : Todo[] = [
            { 
                id: 1, 
                title: "Todo A",
                is_done: false,
                created_by: "user-123",
                created_at: "2024-01-01T10:00:00Z" 
            },
            { 
                id: 2, 
                title: "Todo B", 
                is_done: false,
                created_by: "user-123",
                created_at: "2024-01-01T10:00:00Z" 
            },  
        ];

        const mockRepository : TodoRepository = {
            create: vi.fn(),
            findByUserId: vi.fn().mockResolvedValue(mockTodos),
            findById: vi.fn(),
        };

        const result = await getTodosUseCase("user-123" , mockRepository);

        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });

    it("リポジトリがエラーを返した場合、エラーをスローする", async => {
        const mockRepository : TodoRepository = {
            create: vi.fn(),
            findByUserId: vi.fn().mockRejectedValue(new Error("DB接続エラー")),
            findById: vi.fn(),
        }
    });
});