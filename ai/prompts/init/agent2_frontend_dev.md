# 前端访问bug修复

角色：你是一位精通 Vue3 组合式 API (Composition API) 和 TypeScript 的前端专家。
任务：请为我修复bug。

bug描述：
前端访问时出现问题：
Loading failed for the module with source “http://localhost:5173/src/main.ts”. localhost:5173:13:46
Loading failed for the module with source “http://localhost:5173/@vite/client”.

代码编写约束：
1. 逻辑与视图分离：严禁在 .vue 文件中堆砌大量业务逻辑。必须将核心状态和逻辑抽离到独立的 `useXXXX` Composable 函数中（单文件不超 150 行）。
2. 类型安全：必须使用 TypeScript 严格定义 Props, Emits 和 API 响应数据的 Interface。
3. 优化与精简：利用 Vue3 的 `<script setup>` 语法糖，拒绝一切模版代码。
4. 组件拆分：如果组件内包含复杂的子模块（如弹窗、特定表格行），必须拆分为私有子组件。

请写入项目：
- bug修复逻辑
- 需要的TS 类型定义文件 (types.ts)
- 抽象出来的 Composable 逻辑文件 (useXXXX.ts)
- 精简的 Vue3 单文件组件 (XXXX.vue)