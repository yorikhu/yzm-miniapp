# 韵盏茗

使用 pnpm workspaces 管理的全栈 Monorepo。

## 项目结构

```text
apps/
├── miniapp/  # UniApp + Vue 3 + TypeScript 微信小程序
└── api/      # NestJS 后端服务
```

小程序前端按职责拆分：

```text
apps/miniapp/src/
├── components/   # 仅存放全局可复用组件
├── composables/  # 购物车与导航等复用逻辑
├── pages/        # 页面容器
├── services/     # Chance Mock 数据服务
├── styles/       # 全局设计变量与响应式基础样式
└── types/        # 业务类型
```

仅由单个页面使用的业务组件放在对应页面的 `components/` 目录中，避免把页面私有实现注册为全局组件。

当前前端数据由依赖包 `chance` 生成，后续接入 NestJS API 时只需替换 `services/mock` 数据层。

### CSS 命名规范

前端 CSS 类名统一使用纯 `kebab-case`，元素和状态均使用单个短横线连接：

```text
product-card-visual
product-card-price
product-card-active
```

不使用 `block__element--modifier` 形式。CSS 自定义变量仍遵循标准的双短横线语法，例如 `--yzm-jade`。

## 环境要求

- Node.js 20.18+
- pnpm 10+

## 安装依赖

```bash
pnpm install
```

## 本地开发

微信小程序：

```bash
pnpm dev:miniapp
```

使用微信开发者工具导入 `apps/miniapp/dist/dev/mp-weixin`。

后端服务：

```bash
cp apps/api/.env.example apps/api/.env
pnpm dev:api
```

默认监听 `http://localhost:3000`，健康检查地址为：

```text
GET http://localhost:3000/api/health
```

### 前端 API 请求

复制前端环境变量示例：

```bash
cp apps/miniapp/.env.example apps/miniapp/.env.local
```

`VITE_API_TARGET=local` 使用本地 API，`VITE_API_TARGET=remote` 使用远程 API。微信开发者工具可访问 `127.0.0.1`；真机联调时，需将 `VITE_API_LOCAL_BASE_URL` 设为电脑的局域网 IP，并确保手机与电脑位于同一网络。

业务代码通过统一请求函数访问后端：

```ts
import { request } from '@/services/request';

interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

const health = await request<HealthResponse>({ path: '/health' });
```

请求函数会统一拼接 API 根地址、应用超时设置，并将非 2xx 响应转换为 `ApiRequestError`。

## 验证与构建

```bash
pnpm type-check
pnpm test
pnpm test:e2e
pnpm build
```

格式化代码：

```bash
pnpm format
pnpm format:check
```

提交代码时，Husky 会自动调用 lint-staged 格式化本次暂存的开发文件。

小程序生产产物位于 `apps/miniapp/dist/build/mp-weixin`，后端产物位于 `apps/api/dist`。

## 配置

- 在 `apps/miniapp/src/manifest.json` 的 `mp-weixin.appid` 中填写微信小程序 AppID。
- 后端支持通过 `PORT` 修改端口。
- `CORS_ORIGIN` 可填写逗号分隔的允许来源；未配置时允许所有来源。
