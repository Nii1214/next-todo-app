# Todoアプリ
## 使用技術
```
{
  "name": "next-todo-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.90.1",
    "next": "16.1.1",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.1",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^5.1.2",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "jsdom": "^27.4.0",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.0.17"
  }
}
```

## 背景
Todoアプリの作成で以下の能力を身につける
- 中規模・大規模の実務向けのディレクトリ構成
- 簡単な機脳
- ドメイン処理の実装
- テストコードの実装

## ディレクトリ構成
```
src
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── todos
│       ├── TodoCreateForm.tsx
│       ├── actions
│       │   └── createTodo.ts
│       └── page.tsx
├── components
│   ├── common
│   │   └── Message.tsx
│   └── todo
├── domain
│   └── todo
│       ├── createTodoUseCase.test.ts
│       └── createTodoUseCase.ts
├── hooks
│   └── useMessage.ts
├── lib
│   └── supabase
│       ├── client.ts
│       └── server.ts
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── repositories
│   ├── todoRepository.ts
│   └── todoRepositoryImpl.ts
├── types
│   └── todo.ts
└── utils
    ├── validateTodo.test.ts
    └── validateTodo.ts
```

## よく利用するコマンド
- src配下のディレクトリ
```bash
tree src -I "node_modules|.git|.next"
```
- テスト実行
```bash
npx vitest run
```
- テストカバレッジ
```bash
npm run test:coverage
```