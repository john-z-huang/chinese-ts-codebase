# Codex TypeScript 中文编码规范

本仓库后续由 Codex 生成、修改或补全 TypeScript 代码时，默认使用中文表达业务语义。除 TypeScript/JavaScript 语法关键字、运行时/API 固定名称、第三方库固定接口、协议字段、文件格式字段、环境变量、命令行参数等必须保持英文的内容外，优先使用中文。

## 默认规则

- 变量名、函数名、类名、方法名、类型别名、接口名、枚举名、常量名优先使用中文。
- 代码注释、JSDoc、README、开发说明、测试说明默认使用中文。
- 用户可见的提示语、错误信息、日志信息默认使用中文。
- 测试函数名和测试用例描述默认使用中文，除非测试框架或工具链要求英文。
- 保持 TypeScript 代码可读、可运行、可维护，不为了使用中文而破坏工具兼容性。

## 命名约定

- 普通变量和函数使用中文语义，必要时用下划线分隔含义。
- 类名、类型别名、接口名、枚举名使用中文语义的 PascalCase 风格；如果工具不兼容中文类型名，可改用英文名称并用中文注释说明。
- 常量使用中文语义的大写名称，必要时用下划线分隔。
- 私有成员仍可使用 `private`、`#` 或单下划线前缀，例如 `private 缓存结果`、`#缓存结果`、`_缓存结果`。
- 避免中英文混杂命名；只有固定接口、框架约定或领域术语确有必要时才混用。

示例：

```ts
const 最大重试次数 = 3;

type 商品 = {
  价格: number;
  数量: number;
};

function 计算订单总价(商品列表: 商品[], 折扣率 = 0): number {
  const 原始总价 = 商品列表.reduce(
    (总价, 当前商品) => 总价 + 当前商品.价格 * 当前商品.数量,
    0,
  );

  return 原始总价 * (1 - 折扣率);
}
```

## 必须保留英文的场景

- TypeScript/JavaScript 关键字、内置对象和语法结构，例如 `function`、`class`、`if`、`import`、`export`、`Promise`、`Array`。
- 标准库、第三方库、框架公开 API 的固定名称，例如 `Bun.serve`、`Bun.file`、`useState`、`useEffect`、`Request`、`Response`、`test`、`expect`。
- 框架约定文件、导出函数、组件属性或生命周期名称，例如 `default`、`props`、`children`、`loader`、`action`、`getServerSideProps`。
- 外部系统约定的字段名、JSON 键、HTTP header、数据库列名、环境变量、CLI 参数。
- 包名、模块名、入口点、配置项中被工具链读取的固定名称。
- 与英文生态强绑定的异常类名、协议类名、事件名或 DOM API 名称，改名会降低兼容性时保留英文。
- 注释符号、类型符号、运算符、文件格式标记等语法或格式要求的内容，例如 `//`、`/** */`、`: string`、`=>`。

## Bun 开发约定

本仓库默认优先使用 Bun，而不是 Node.js、npm、pnpm、yarn、vite、webpack 或 esbuild。除非现有项目配置明确依赖其他工具，新增脚本、命令和示例应优先使用 Bun。

- 使用 `bun <文件>` 运行 TypeScript 或 JavaScript 文件，不使用 `node <文件>` 或 `ts-node <文件>`。
- 使用 `bun test` 运行测试，不优先使用 `jest` 或 `vitest`。
- 使用 `bun build <file.html|file.ts|file.css>` 构建入口文件，不优先使用 `webpack` 或 `esbuild`。
- 使用 `bun install` 安装依赖，不使用 `npm install`、`yarn install` 或 `pnpm install`。
- 使用 `bun run <脚本>` 运行 `package.json` 脚本，不使用 `npm run <脚本>`、`yarn run <脚本>` 或 `pnpm run <脚本>`。
- 使用 `bunx <包名> <命令>` 执行临时包命令，不使用 `npx <包名> <命令>`。
- Bun 会自动加载 `.env`，不要额外引入 `dotenv`。

## Bun API 约定

- 服务端优先使用 `Bun.serve()`，它支持 WebSocket、HTTPS 和路由；不要优先引入 `express`。
- SQLite 优先使用 `bun:sqlite`，不要优先使用 `better-sqlite3`。
- Redis 优先使用 `Bun.redis`，不要优先使用 `ioredis`。
- Postgres 优先使用 `Bun.sql`，不要优先使用 `pg` 或 `postgres.js`。
- WebSocket 使用内置 `WebSocket`，不要优先使用 `ws`。
- 文件读写优先使用 `Bun.file`，不要优先使用 `node:fs` 的 `readFile` 或 `writeFile`。
- Shell 命令优先使用 `Bun.$`，不要优先使用 `execa`。

## 测试约定

测试默认使用 `bun test`。测试描述和业务变量应尽可能使用中文，测试框架提供的 `test`、`expect` 等固定 API 保持英文。

```ts
import { expect, test } from "bun:test";

test("计算订单总价", () => {
  expect(1 + 1).toBe(2);
});
```

## 前端约定

前端入口优先使用 `Bun.serve()` 的 HTML imports，不优先使用 `vite`。HTML imports 支持 React、CSS 和 Tailwind；HTML 文件可以直接导入 `.tsx`、`.jsx` 或 `.js` 文件，Bun 的打包器会自动转译和打包。`<link>` 标签可以指向样式表，Bun 的 CSS 打包器会自动处理。

服务端示例：

```ts
import 首页 from "./index.html";

Bun.serve({
  routes: {
    "/": 首页,
    "/api/users/:id": {
      GET: (请求) => {
        return Response.json({ id: 请求.params.id });
      },
    },
  },
  websocket: {
    open: (连接) => {
      连接.send("你好，世界！");
    },
    message: (连接, 消息) => {
      连接.send(消息);
    },
    close: (_连接) => {
      // 按业务需要处理连接关闭。
    },
  },
  development: {
    hmr: true,
    console: true,
  },
});
```

HTML 入口示例：

```html
<html>
  <body>
    <h1>你好，世界！</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

React 入口示例：

```tsx
import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const 根节点 = createRoot(document.body);

export default function 前端页面() {
  return <h1>你好，世界！</h1>;
}

根节点.render(<前端页面 />);
```

运行开发服务时使用：

```sh
bun --hot ./index.ts
```

更多 Bun API 信息优先阅读 `node_modules/bun-types/docs/**.mdx`。

## 注释与文档

- 注释解释业务意图、边界条件和不明显的实现原因，不重复代码表面行为。
- JSDoc 使用中文描述参数、返回值、异常和副作用；标签名等固定语法保持英文，例如 `@param`、`@returns`。
- 面向使用者的文档优先给中文示例。
- 当英文名称无法避免时，在中文说明中解释其含义。

## 质量要求

- 生成代码后应保证 `bun test`、`bun run <脚本>`、`tsc`、`eslint`、`prettier` 等项目现有工具能够正常处理中文标识符。
- 如果某个工具、库、打包器或运行环境不能稳定支持中文标识符，应优先保证程序正确性，并在代码或提交说明中解释保留英文的原因。
- 不主动重命名无关既有代码；修改已有文件时，优先保持现有风格，只在本次变更相关范围内应用中文规范。
