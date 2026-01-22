import { TodoRepository } from "@/repositories/todoRepository";
import { describe, expect, it, vi } from "vitest";
import { createTodoUseCase } from "./createTodoUseCase";

// テスト実行：npm run test src/domain/todo/createTodoUseCase.test.ts

describe("createTodoUseCase", () => {
    it("正常なタイトルでTodoを作成", async() => {
        // モック準備
        const mockRepository: TodoRepository = {
            create: vi.fn().mockResolvedValue(undefined),
            findByUserId: vi.fn(),
            findById: vi.fn(), 
        };

        // UseCaseを実行
        await createTodoUseCase(
            {title: "買い物に行く"},
            mockRepository
        );
        
        // リポジトリが呼ばれることを確認
        expect(mockRepository.create).toHaveBeenCalledWith({
            title: "買い物に行く",
            is_done: false,
        });
        // 一回だけ実行されるかを確認
        expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it("空文字の場合、エラーをスローする", async() => {
        const mockRepository: TodoRepository = {
            create: vi.fn(),
            findByUserId: vi.fn(),
            findById: vi.fn(),
        }

        await expect(
            createTodoUseCase({title: ""}, mockRepository)
        ).rejects.toThrow("Todoを入力してください");
        
        // リポジトリが呼ばれていないことを確認
        expect(mockRepository.create).not.toHaveBeenCalled();

    });

    it("51文字以上の場合、エラーをスローする", async() => {
        const mockRepository: TodoRepository = {
            create: vi.fn(),
            findByUserId: vi.fn(),
            findById: vi.fn(),
        };

        const longTitle = "a".repeat(51);

        await expect(
            createTodoUseCase({ title: longTitle }, mockRepository)
        ).rejects.toThrow("Todoは50文字以内で入力してください");

        expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it("リポジトリがエラーを返した場合、エラーをスローする", async() => {
        const mockRepository: TodoRepository = {
            create: vi.fn().mockRejectedValue(new Error("DB接続エラー")),
            findByUserId: vi.fn(),
            findById: vi.fn(),
        };

        await expect(
            createTodoUseCase({ title: "買い物に行く"} ,mockRepository)
        ).rejects.toThrow("DB接続エラー");
    });

    it("is_doneがfalseで作成される" ,async() => {
        const mockRepository: TodoRepository = {
            create: vi.fn().mockResolvedValue(undefined),
            findByUserId: vi.fn(),
            findById: vi.fn(),
        }

        await createTodoUseCase(
            {title: "テスト"},
            mockRepository
        );

        // is_doneがfalseで呼ばれているかを確認
        expect(mockRepository.create).toHaveBeenCalledWith({
            title: "テスト",
            is_done: false,
        })
    })

    it("前後の空白を除去してTodoを作成する", async() => {
        const mockRepository : TodoRepository = {
            create: vi.fn().mockResolvedValue(undefined),
            findByUserId: vi.fn(),
            findById: vi.fn(),
        };

        await createTodoUseCase(
            {title: " 買い物に行く "},
            mockRepository
        );

        expect(mockRepository.create).toHaveBeenCalledWith({
            title: "買い物に行く",
            is_done: false,
        });
    });
});