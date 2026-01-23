import { TodoRepository } from "@/repositories/todoRepository";
import { vi } from "vitest";

/**
 * テスト用のモックRepositoryを作成
 * 必要なメソッドだけオーバーライドできる
 */
export function createMockRepository(
    overrides?: Partial<TodoRepository>
): TodoRepository {
    return {
        create: vi.fn(),
        findByUserId: vi.fn(),
        findById: vi.fn(),
        update: vi.fn(),
        // delete: vi.fn(),
        ...overrides,  // 個別のテストで上書き可能
    };
}