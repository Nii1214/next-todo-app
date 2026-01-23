import { describe, expect, it, vi } from "vitest";
import { createMockTodo } from "./__tests__/helpers/mockData";
import { createMockRepository } from "./__tests__/helpers/mockRepository";
import { updateTodoUseCase } from "./updateTodoUseCase";

// テスト実行：npm run test src/domain/todo/updateTodoUseCase.test.ts

describe("updateTodoUseCase" , () => {
    it("タイトルを更新できる", async() => {
        const mockTodo =  createMockTodo({title: "元のタイトル"});
        const mockRepository = createMockRepository({
            findById: vi.fn().mockResolvedValue(mockTodo),
            update: vi.fn().mockResolvedValue(undefined),
        });

        await updateTodoUseCase(
            1,
            {title: "新しいタイトル"},
            "user-123",
            mockRepository
        );
        // findByIdが呼び出されるか
        expect(mockRepository.findById).toHaveBeenCalledWith(1);
        expect(mockRepository.update).toHaveBeenCalledWith(1,{title: "新しいタイトル"});
    });

    it("is_doneを更新できる", async() => {
        const mockTodo = createMockTodo();
        const mockRepository = createMockRepository({
            findById: vi.fn().mockResolvedValue(mockTodo),
            update: vi.fn().mockResolvedValue(undefined),
        });

        await updateTodoUseCase(
            1,
            { is_done: true },
            "user-123",
            mockRepository,
        );
        
        expect(mockRepository.update).toHaveBeenCalledWith(1,{is_done: true ,});
    });

    it("タイトルとis_doneを同時に変更できる", async () => {
        const mockTodo = createMockTodo();
        const mockRepository = createMockRepository({
            findById: vi.fn().mockResolvedValue(mockTodo),
            update: vi.fn().mockResolvedValue(undefined),
        });

        await updateTodoUseCase(
            1,
            {title: "新しいタイトル", is_done: true},
            "user-123",
            mockRepository
        );

        expect(mockRepository.update).toHaveBeenCalledWith(1,{title: "新しいタイトル",is_done: true});
    });

    it("存在しないTodoを更新しようとするとエラーをスローする", async() => {
        const mockTodo = createMockTodo();
        const mockRepository = createMockRepository({
            findById: vi.fn().mockResolvedValue(null), // Todoが見つからない
        });

        await expect(
            updateTodoUseCase(999, {title: "新しいタイトル"} ,"user-123", mockRepository)   
        ).rejects.toThrow("Todoが見つかりません");;
        
        // updateが呼ばれていないかを確認
        expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("他人のTodoを更新しようとするとエラーをスローする" ,async() => {
        const mockTodo = createMockTodo();
        const mockRepository = createMockRepository({
            findById: vi.fn().mockResolvedValue(mockTodo), // Todoが見つからない
        });

        await expect(
            updateTodoUseCase(
                1,{title: "新しいタイトル"},"user-456",mockRepository
            )
        ).rejects.toThrow("更新権限がありません");
    });

    it("空文字のタイトルを更新しようとするとエラーをスローする", async()=>{
        const mockTodo = createMockTodo();
        const mockRepository = createMockRepository({
            findById: vi.fn().mockResolvedValue(mockTodo), // Todoが見つからない
        });

        await expect(
            updateTodoUseCase(1,{title: ""},"user-123",mockRepository)
        ).rejects.toThrow("Todoを入力してください")

        expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("51文字以上のタイトルで更新しようとするとエラーをスローする", async () => {
        const mockTodo = createMockTodo();
        const mockRepository = createMockRepository({
          findById: vi.fn().mockResolvedValue(mockTodo),
        });
    
        const longTitle = "a".repeat(51);
    
        await expect(
          updateTodoUseCase(1, { title: longTitle }, "user-123", mockRepository)
        ).rejects.toThrow("Todoは50文字以内で入力してください");
    
        expect(mockRepository.update).not.toHaveBeenCalled();
    });
    
    it("前後の空白を除去してタイトルを更新する", async () => {
    const mockTodo = createMockTodo();
    const mockRepository = createMockRepository({
        findById: vi.fn().mockResolvedValue(mockTodo),
        update: vi.fn().mockResolvedValue(undefined),
    });

    await updateTodoUseCase(
        1,
        { title: "  新しいタイトル  " },
        "user-123",
        mockRepository
    );

    expect(mockRepository.update).toHaveBeenCalledWith(1, {
        title: "新しいタイトル",
    });
    });

    it("リポジトリがエラーを返した場合、エラーをスローする", async () => {
    const mockTodo = createMockTodo();
    const mockRepository = createMockRepository({
        findById: vi.fn().mockResolvedValue(mockTodo),
        update: vi.fn().mockRejectedValue(new Error("DB接続エラー")),
    });

    await expect(
        updateTodoUseCase(1, { title: "新しいタイトル" }, "user-123", mockRepository)
    ).rejects.toThrow("DB接続エラー");
    });
})