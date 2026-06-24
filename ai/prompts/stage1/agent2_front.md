# 1. 实现界面


角色：你是一位精通 Vue3 组合式 API (Composition API) 和 TypeScript 的前端专家。
任务：请为我初步实现前端通用页面的功能。

功能描述：

1. 完成主页部分
    - 主页需要一个标题，标题写网站的名称
    - 主页做一些简单的神经网络粒子效果
2. 完成关于部分
    - 暂时不用写内容，只是生成一个页面
3. 实现优美的menubar
    - menubar里要包含以下按钮： 左侧：主页，博客，文件，关于  右侧：登录/注册


代码编写约束：
1. 逻辑与视图分离：严禁在 .vue 文件中堆砌大量业务逻辑。必须将核心状态和逻辑抽离到独立的 `useXXXX` Composable 函数中（单文件不超 150 行）。
2. 类型安全：必须使用 TypeScript 严格定义 Props, Emits 和 API 响应数据的 Interface。
3. 优化与精简：利用 Vue3 的 `<script setup>` 语法糖，拒绝一切模版代码。
4. 组件拆分：如果组件内包含复杂的子模块（如弹窗、特定表格行），必须拆分为私有子组件。

要求：

1. 使用primevue优化界面展现
2. 优先符合pc端的查看习惯，占满屏幕
3. 适配手机端查看

请参考：

@ai/reference/color_ref 用于配色设计


请输出并写入项目：
- TS 类型定义文件 (types.ts)
- 抽象出来的 Composable 逻辑文件 (useXXXX.ts)
- 精简的 Vue3 单文件组件 (XXXX.vue)


# 2. 优化界面

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


# 3. i18n 

请你在之前要求的基础上，实现前端项目的i18n处理

# 4. i18n 按钮优化

现在请你延续之前的要求，使用之前的配色风格，美化中英语切换按钮

