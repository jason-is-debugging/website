# 优化界面


角色：你是一位精通 Vue3 组合式 API (Composition API) 和 TypeScript 的前端专家。
任务：请为我优化前端页面的展现。

代码编写约束：
1. 逻辑与视图分离：严禁在 .vue 文件中堆砌大量业务逻辑。必须将核心状态和逻辑抽离到独立的 `useXXXX` Composable 函数中（单文件不超 150 行）。
2. 类型安全：必须使用 TypeScript 严格定义 Props, Emits 和 API 响应数据的 Interface。
3. 优化与精简：利用 Vue3 的 `<script setup>` 语法糖，拒绝一切模版代码。
4. 组件拆分：如果组件内包含复杂的子模块（如弹窗、特定表格行），必须拆分为私有子组件。

要求：

1. 使用primevue优化界面展现
2. 优先符合pc端的查看习惯，占满屏幕

请参考：

@ai/reference/color_ref 用于配色设计


请输出并写入项目：
- TS 类型定义文件 (types.ts)
- 抽象出来的 Composable 逻辑文件 (useXXXX.ts)
- 精简的 Vue3 单文件组件 (XXXX.vue)


# MOCK 
请你在之前要求的基础上，
请你添加mock数据，包括用户，管理员，博客，文件