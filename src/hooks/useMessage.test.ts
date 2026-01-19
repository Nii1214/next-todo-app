import { describe, expect, it } from "vitest";
import { renderHook, act } from '@testing-library/react';
import { useMessage } from "./useMessage";

describe('useMessage' , () => {
    it('初期状態でmessageがnullである', () => {
        const { result } = renderHook(() => useMessage());

        expect(result.current.message).toBeNull();
    })

    it('showMessageでメッセージを設定できる', () => {
        const { result } = renderHook(() => useMessage());

        act(() => {
            result.current.showMessage('テストメッセージ','success');
        });

        expect(result.current.message).toEqual({
            text: 'テストメッセージ',
            type: 'success',
        });
    });

    it('clearMessageでメッセージクリアできる' , () => {
        const { result } = renderHook(() => useMessage());

        // メッセージを設定
        act(() => {
            result.current.showMessage('テストメッセージ','success');
        });

        // クリア
        act(() => {
            result.current.clearMessage();
        });
    });

    it('複数回呼ぶと最新のメッセージが上書きされる', () => {
        const { result } = renderHook(() => useMessage());

        act(() => {
            result.current.showMessage('最初のメッセージ', 'info');
        });

        act(() => {
            result.current.showMessage('2番目のメッセージ', 'error');
        });

        expect (result.current.message).toEqual({
            text: '2番目のメッセージ',
            type: 'error',
        });
    });

    it('各メッセージが正しく設定される', () => {
        const { result } = renderHook(() => useMessage());
        const types: Array<'success' | 'error' | 'info' > = ['success', 'error' ,'info'];

        types.forEach((type) => {
            act(() => {
                result.current.showMessage(`${type}メッセージ`, type);
            });

            expect(result.current.message?.type).toBe(type);
        });
    });
});