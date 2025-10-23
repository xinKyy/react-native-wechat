# TypeScript 类型支持配置说明

## 已完成的配置

### 1. 构建配置更新

- **安装了 `vite-plugin-dts`**: 专门用于生成 TypeScript 声明文件的 Vite 插件
- **更新了 `vite.config.ts`**: 配置 `dts` 插件，自动生成并合并类型声明文件到 `dist/index.d.ts`
- **简化了构建命令**: 从 `tsc && vite build` 简化为 `vite build`

### 2. Package.json 配置

```json
{
  "main": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": [
    "src",
    "android",
    "ios",
    "dist/*",
    "RTNWechat.podspec"
  ]
}
```

- `types` 字段指向正确的类型声明文件
- `files` 字段包含 `dist/*`，确保类型文件会被发布到 npm

### 3. 导出所有类型

在 `src/index.ts` 中添加了 `export * from './typing'`，确保所有类型都被导出：

- `NativeWechatResponse` - 通用响应类型
- `SendAuthRequestResponse` - 授权响应类型
- `LaunchMiniProgramResponse` - 小程序启动响应类型
- `UniversalLinkCheckingResponse` - Universal Link 检查响应类型
- `WechatShareScene` - 分享场景常量类型
- `WechatMiniprogramType` - 小程序类型常量
- `NativeWechatModuleConstants` - 所有常量类型
- `Recordable` - 工具类型

### 4. 文档更新

在 `readme.md` 中添加了专门的 "TypeScript Support" 章节，包括：
- 可用类型列表
- 类型使用示例
- 最佳实践说明

## 使用方法

### 安装后自动获得类型支持

用户安装你的包后，TypeScript 会自动识别类型：

```bash
npm install @xinkyy/react-native-wechat
# 或
yarn add @xinkyy/react-native-wechat
```

### 在代码中使用

```typescript
import {
  registerApp,
  sendAuthRequest,
  SendAuthRequestResponse,
  NativeWechatConstants,
} from '@xinkyy/react-native-wechat';

// TypeScript 会自动提供类型检查和自动完成
async function login() {
  const result: SendAuthRequestResponse = await sendAuthRequest({
    scope: 'snsapi_userinfo',
  });
  
  console.log(result.data.code); // 类型安全
}
```

## 构建流程

运行 `yarn build` 或 `npm run build` 会：
1. 使用 Vite 构建 ES 模块 (`dist/index.mjs`)
2. 使用 vite-plugin-dts 生成并合并所有类型声明文件到 `dist/index.d.ts`
3. 自动处理所有依赖和引用关系

## 发布到 NPM

当你发布包时，`dist/index.d.ts` 文件会自动包含在 npm 包中，用户安装后即可获得完整的 TypeScript 类型支持。

```bash
# 发布前确保构建
yarn build

# 发布到 npm
npm publish
```

## 验证类型是否正常工作

你可以创建一个测试文件来验证：

```typescript
// test-types.ts
import {
  sendAuthRequest,
  NativeWechatResponse,
} from './dist/index';

// 如果没有类型错误，说明配置成功
const test = async () => {
  const result = await sendAuthRequest();
  console.log(result.data.code);
};
```

运行类型检查：
```bash
npx tsc --noEmit test-types.ts
```

没有错误输出表示类型配置成功！

