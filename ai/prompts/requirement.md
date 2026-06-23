# 个人网站项目功能需求文档

## 一、项目概述

本项目旨在构建一个功能完善的个人网站平台，包含博客发布系统和轻量级云盘系统两大核心模块，并配套后台管理系统进行统一管理。

---

## 二、核心功能模块

### 2.1 博客系统

#### 2.1.1 博客编写（后台管理）

| 功能点 | 详细描述 |
|--------|----------|
| 后台编写 | 通过后端管理系统进入博客编辑界面 |
| Markdown 编辑器 | 提供专业的 Markdown 编辑器，支持实时语法提示 |
| 实时渲染预览 | 左侧编写，右侧同步预览渲染效果 |
| 图片上传 | 支持在编写过程中上传图片，支持拖拽上传 |
| LaTeX 公式 | 支持行内公式 `$...$` 和块级公式 `$$...$$` |
| Mermaid 图表 | 支持在 Markdown 中嵌入 Mermaid 流程图、时序图等 |
| 其他增强功能 | 代码高亮、任务列表、表格等常用 Markdown 扩展 |

#### 2.1.2 博客展示（前台游客界面）

| 功能点 | 详细描述 |
|--------|----------|
| 完整渲染 | 完整渲染 Markdown 内容，包括公式、图表、代码高亮 |
| 响应式设计 | 适配桌面端和移动端阅读体验 |
| 阅读导航 | 支持文章目录导航，方便长文章阅读 |
| 评论区 | 支持游客和登录用户发表评论 |

#### 2.1.3 评论系统

| 功能点 | 详细描述 |
|--------|----------|
| 签到评论 | 支持用户每日签到式评论（简短互动） |
| 多层嵌套评论 | 支持评论的二级、三级等多层嵌套回复 |
| 被评论者通知 | 被回复的用户可收到评论内容通知（邮件/站内） |
| 作者直达评论 | 游客可直接评论文章作者，无需登录 |
| 评论审核 | 评论提交后需后台审核通过方可展示 |

---

### 2.2 云盘系统

#### 2.2.1 文件管理

| 角色 | 可用功能 |
|------|----------|
| 管理员 | 上传文件、新建文件夹、删除文件、修改文件、重命名 |
| 普通用户 | 浏览文件目录、搜索文件、下载文件 |
| 游客 | 预览文件（部分格式） |

#### 2.2.2 预览功能（无需登录）

| 文件类型 | 预览支持 |
|----------|----------|
| 图片 | JPG、PNG、GIF、WebP 等主流格式 |
| 文本文件 | TXT、Markdown 文件（渲染展示） |
| 代码文件 | 支持语法高亮的代码文件预览 |
| PDF | 在线 PDF 预览 |
| 其他 | 显示文件基本信息，不支持内容预览 |

#### 2.2.3 下载功能（需登录）

- 普通用户登录后可下载文件
- 支持大文件分块下载
- 支持批量下载（打包为 ZIP）

#### 2.2.4 目录与搜索

| 功能点 | 详细描述 |
|--------|----------|
| 目录结构 | 树形目录结构展示 |
| 文件夹导航 | 点击文件夹进入，支持面包屑导航 |
| 文件搜索 | 支持按文件名搜索，支持模糊匹配 |
| 排序功能 | 按名称、日期、大小排序 |

---

### 2.3 用户系统

#### 2.3.1 注册与登录

| 功能点 | 详细描述 |
|--------|----------|
| 邮箱注册 | 用户通过邮箱进行注册 |
| 邮箱验证码 | 注册时发送验证码到邮箱进行验证 |
| 验证码登录 | 支持邮箱+验证码快速登录 |
| 密码登录 | 支持用户名/邮箱+密码登录 |

#### 2.3.2 权限体系

| 操作 | 游客 | 普通用户 | 管理员 |
|------|------|----------|--------|
| 预览文件 | ✅ | ✅ | ✅ |
| 评论作者文章 | ✅ | ✅ | ✅ |
| 发表评论 | ❌ | ✅ | ✅ |
| 下载文件 | ❌ | ✅ | ✅ |
| 管理博客 | ❌ | ❌ | ✅ |
| 管理用户 | ❌ | ❌ | ✅ |
| 管理评论 | ❌ | ❌ | ✅ |
| 上传/修改文件 | ❌ | ❌ | ✅ |

---

### 2.4 前台展示界面

#### 2.4.1 页面结构

| 页面 | 功能描述 |
|------|----------|
| 主页 | 个人简介展示、置顶文章列表、最新动态 |
| 博客页 | 文章列表、分类目录、标签筛选、搜索功能 |
| 文章详情页 | 完整文章内容渲染、评论区 |
| 文件页 | 云盘文件目录展示、搜索、预览/下载 |
| 关于页 | 作者详细介绍、联系方式 |
| 登录/注册页 | 用户认证入口 |

#### 2.4.2 博客页功能

- 文章分类目录（侧边栏）
- 标签云
- 文章搜索（标题、内容关键词）
- 分页展示
- 阅读量统计

#### 2.4.3 文件页功能

- 目录树导航
- 文件列表（支持缩略图）
- 文件搜索
- 排序切换

---

### 2.5 后台管理系统

#### 2.5.1 仪表盘

| 功能点 | 详细描述 |
|--------|----------|
| 数据概览 | 文章数量、用户数量、评论数量、文件数量 |
| 服务器监控 | CPU、内存、磁盘使用率实时图表 |
| 访问统计 | 今日/本周/本月访问量趋势图 |
| 近期动态 | 最新注册用户、最新评论等 |

#### 2.5.2 博客管理

| 功能点 | 详细描述 |
|--------|----------|
| 文章列表 | 展示所有文章，支持筛选、搜索、排序 |
| 文章编辑 | 修改已发布的文章 |
| 新建文章 | 创建新博客文章 |
| 分类管理 | 添加/编辑/删除文章分类 |
| 标签管理 | 添加/编辑/删除文章标签 |
| 草稿箱 | 保存未发布的文章草稿 |

#### 2.5.3 评论管理

| 功能点 | 详细描述 |
|--------|----------|
| 评论列表 | 展示所有评论及回复 |
| 审核评论 | 审核新提交的评论（通过/拒绝） |
| 举报管理 | 处理被举报的评论 |
| 批量操作 | 批量删除、批量通过 |

#### 2.5.4 用户管理

| 功能点 | 详细描述 |
|--------|----------|
| 用户列表 | 展示所有注册用户 |
| 用户详情 | 查看用户信息、评论历史 |
| 禁用/启用 | 禁用问题用户，启用被禁用户 |
| 权限变更 | 普通用户 ↔ 管理员切换 |

#### 2.5.5 文件管理

| 功能点 | 详细描述 |
|--------|----------|
| 文件列表 | 展示所有云盘文件 |
| 上传文件 | 上传新文件到指定目录 |
| 文件夹管理 | 新建/重命名/删除文件夹 |
| 存储统计 | 各用户存储空间使用情况 |

#### 2.5.6 系统设置

| 功能点 | 详细描述 |
|--------|----------|
| 网站信息 | 网站名称、描述、Logo 等 |
| 邮件配置 | SMTP 服务器配置 |
| 服务器配置 | 允许的文件类型、最大上传大小等 |

---

## 三、技术选型

### 3.1 技术栈概览

| 层级 | 技术选型 |
|------|----------|
| 前端框架 | Vue 3 (Composition API) + TypeScript |
| 构建工具 | Vite 5.x |
| UI 组件库 | Element Plus / Naive UI |
| 路由管理 | Vue Router 4.x |
| 状态管理 | Pinia |
| Markdown 渲染 | markdown-it + KaTeX + Mermaid.js |
| Markdown 编辑器 | Vditor / ByteMD |
| 后端语言 | Go 1.21+ |
| Web 框架 | Gin / Fiber |
| 数据库 | SQLite 3 |
| ORM | GORM |
| 用户认证 | JWT (JSON Web Token) |
| 邮件服务 | net/smtp (Go 内置) |
| 文件服务 | 本地存储 |
| API 风格 | RESTful |

### 3.2 项目目录结构

```
website/
├── frontend/                 # Vue 3 前端项目
│   ├── src/
│   │   ├── api/            # API 请求封装
│   │   ├── assets/         # 静态资源
│   │   ├── components/     # 公共组件
│   │   ├── composables/    # 组合式函数
│   │   ├── layouts/        # 布局组件
│   │   ├── pages/          # 页面组件
│   │   │   ├── blog/       # 博客相关页面
│   │   │   ├── file/       # 云盘相关页面
│   │   │   ├── user/       # 用户相关页面
│   │   │   └── admin/      # 后台管理页面
│   │   ├── router/         # 路由配置
│   │   ├── stores/         # Pinia 状态管理
│   │   ├── styles/         # 全局样式
│   │   ├── types/          # TypeScript 类型定义
│   │   ├── utils/          # 工具函数
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                  # Go 后端项目
│   ├── cmd/                 # 入口文件
│   │   └── server/
│   │       └── main.go
│   ├── config/              # 配置加载
│   ├── internal/
│   │   ├── handlers/        # HTTP 处理器
│   │   ├── middleware/      # 中间件
│   │   ├── models/         # 数据模型
│   │   ├── repository/     # 数据访问层
│   │   └── service/        # 业务逻辑层
│   ├── pkg/
│   │   ├── database/       # 数据库连接
│   │   ├── response/       # 统一响应
│   │   └── utils/          # 工具函数
│   ├── go.mod
│   └── go.sum
│
├── uploads/                 # 上传文件存储目录
├── data/                    # SQLite 数据库文件
├── requirement.md          # 本文档
└── README.md
```

### 3.3 数据库表设计

```sql
-- 用户表
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',  -- 'admin' | 'user'
    avatar VARCHAR(255),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 邮箱验证码表
CREATE TABLE email_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(100) NOT NULL,
    code VARCHAR(6) NOT NULL,
    purpose VARCHAR(20) NOT NULL,  -- 'register' | 'login' | 'reset'
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 文章分类表
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 文章标签表
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 文章表
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    cover_image VARCHAR(255),
    category_id INTEGER,
    is_published BOOLEAN DEFAULT 0,
    is_top BOOLEAN DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    author_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- 文章标签关联表
CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id)
);

-- 评论表
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER,
    parent_id INTEGER,  -- 父评论ID，支持嵌套
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_id) REFERENCES comments(id)
);

-- 文件表
CREATE TABLE files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    size BIGINT DEFAULT 0,
    mime_type VARCHAR(100),
    parent_id INTEGER,  -- 父文件夹ID
    is_folder BOOLEAN DEFAULT 0,
    uploader_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES files(id),
    FOREIGN KEY (uploader_id) REFERENCES users(id)
);

-- 系统设置表
CREATE TABLE settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 四、开发步骤（里程碑）

### 阶段一：项目初始化 ⭐

**目标**：搭建前后端基础框架，配置开发环境

| 步骤 | 任务 | 产出物 |
|------|------|--------|
| 1.1 | 创建前端项目 `frontend/`，使用 Vite + Vue 3 + TypeScript | `frontend/` 目录 |
| 1.2 | 安装前端依赖：Vue Router、Pinia、Axios、Element Plus | `package.json` |
| 1.3 | 配置 Vite 代理，解决跨域问题 | `vite.config.ts` |
| 1.4 | 创建后端项目 `backend/`，初始化 Go Module | `backend/go.mod` |
| 1.5 | 搭建 Gin 框架基础结构 | `backend/` 目录结构 |
| 1.6 | 配置 SQLite 数据库连接 | `database.go` |
| 1.7 | 创建数据库表结构 | SQL 初始化脚本 |
| 1.8 | 配置 CORS 中间件 | `middleware/cors.go` |

---

### 阶段二：用户认证系统 🔐

**目标**：实现用户注册、登录、验证码功能

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 2.1 | 用户注册接口 | `POST /api/auth/register` |
| 2.2 | 发送邮箱验证码接口 | `POST /api/auth/send-code` |
| 2.3 | 邮箱验证码登录接口 | `POST /api/auth/login-code` |
| 2.4 | 密码登录接口 | `POST /api/auth/login-password` |
| 2.5 | 退出登录接口 | `POST /api/auth/logout` |
| 2.6 | 获取当前用户信息 | `GET /api/auth/me` |
| 2.7 | 前端注册/登录页面开发 | 登录/注册 Vue 组件 |
| 2.8 | 路由守卫（未登录跳转） | 路由拦截器 |
| 2.9 | Pinia 用户状态管理 | `stores/user.ts` |

**前端页面**：
- `/login` - 登录页（支持验证码/密码切换）
- `/register` - 注册页

---

### 阶段三：博客系统 - 文章管理 📝

**目标**：完成文章 CRUD 和分类标签管理

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 3.1 | 创建文章接口 | `POST /api/admin/posts` |
| 3.2 | 更新文章接口 | `PUT /api/admin/posts/:id` |
| 3.3 | 删除文章接口 | `DELETE /api/admin/posts/:id` |
| 3.4 | 获取文章列表（后台） | `GET /api/admin/posts` |
| 3.5 | 获取文章详情 | `GET /api/admin/posts/:id` |
| 3.6 | 分类管理 CRUD | `GET/POST/PUT/DELETE /api/admin/categories` |
| 3.7 | 标签管理 CRUD | `GET/POST/PUT/DELETE /api/admin/tags` |
| 3.8 | Markdown 编辑器组件（支持实时预览） | Vditor 集成 |
| 3.9 | 图片上传接口 | `POST /api/admin/upload` |
| 3.10 | 后台文章列表页面 | 文章管理 Vue 组件 |
| 3.11 | 后台文章编辑器页面 | Markdown 编辑器页面 |
| 3.12 | 分类/标签管理页面 | 分类/标签管理组件 |

**前端页面**：
- `/admin/blog/posts` - 文章列表
- `/admin/blog/editor/:id?` - 文章编辑器
- `/admin/blog/categories` - 分类管理
- `/admin/blog/tags` - 标签管理

---

### 阶段四：博客系统 - 前台展示 🏠

**目标**：完成前台博客展示、搜索、阅读功能

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 4.1 | 获取文章列表（前台，分页） | `GET /api/posts` |
| 4.2 | 获取文章详情（含内容） | `GET /api/posts/:slug` |
| 4.3 | 按分类获取文章 | `GET /api/posts?category=xxx` |
| 4.4 | 按标签获取文章 | `GET /api/posts?tag=xxx` |
| 4.5 | 搜索文章 | `GET /api/posts?search=xxx` |
| 4.6 | 获取所有分类 | `GET /api/categories` |
| 4.7 | 获取所有标签 | `GET /api/tags` |
| 4.8 | 增加阅读量 | `POST /api/posts/:id/view` |
| 4.9 | 首页开发 | 主页 Vue 组件 |
| 4.10 | 博客列表页（目录+搜索+分页） | 博客列表组件 |
| 4.11 | 文章详情页（含 Markdown 渲染） | 文章详情组件 |
| 4.12 | 文章目录导航组件 | 侧边目录组件 |

**前端页面**：
- `/` - 首页
- `/blog` - 博客列表页
- `/blog/:slug` - 文章详情页

**Markdown 渲染配置**：
- markdown-it：基础渲染
- KaTeX：LaTeX 公式渲染
- Mermaid.js：流程图渲染
- highlight.js：代码高亮

---

### 阶段五：评论系统 💬

**目标**：实现评论、回复、审核功能

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 5.1 | 提交评论接口 | `POST /api/comments` |
| 5.2 | 获取文章评论列表 | `GET /api/posts/:id/comments` |
| 5.3 | 删除评论接口（用户） | `DELETE /api/comments/:id` |
| 5.4 | 获取待审核评论（后台） | `GET /api/admin/comments?status=pending` |
| 5.5 | 审核评论（通过/拒绝） | `PUT /api/admin/comments/:id/approve` |
| 5.6 | 删除评论（后台） | `DELETE /api/admin/comments/:id` |
| 5.7 | 评论列表页面（后台） | 评论管理组件 |
| 5.8 | 文章详情页评论区域 | 评论组件 |
| 5.9 | 评论通知功能（邮件发送） | 评论通知服务 |

**前端页面**：
- `/blog/:slug` - 包含评论区
- `/admin/comments` - 评论管理页面

---

### 阶段六：云盘系统 📁

**目标**：完成文件浏览、预览、上传、下载功能

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 6.1 | 获取文件列表 | `GET /api/files` |
| 6.2 | 创建文件夹 | `POST /api/admin/files/folder` |
| 6.3 | 上传文件 | `POST /api/admin/files/upload` |
| 6.4 | 删除文件/文件夹 | `DELETE /api/admin/files/:id` |
| 6.5 | 重命名文件/文件夹 | `PUT /api/admin/files/:id` |
| 6.6 | 移动文件/文件夹 | `PUT /api/admin/files/:id/move` |
| 6.7 | 下载文件 | `GET /api/files/:id/download` |
| 6.8 | 预览文本/图片文件 | `GET /api/files/:id/preview` |
| 6.9 | 搜索文件 | `GET /api/files?search=xxx` |
| 6.10 | 文件列表页面（前台） | 文件管理组件 |
| 6.11 | 文件夹导航组件（面包屑） | 面包屑组件 |
| 6.12 | 文件预览组件（图片/文本/Markdown） | 预览组件 |
| 6.13 | 后台文件管理页面 | 文件管理组件 |

**前端页面**：
- `/files` - 云盘首页（文件列表）
- `/admin/files` - 后台文件管理

---

### 阶段七：后台管理系统 - 仪表盘 📊

**目标**：完成数据概览、服务器监控

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 7.1 | 获取统计数据接口 | `GET /api/admin/dashboard/stats` |
| 7.2 | 获取服务器状态 | `GET /api/admin/dashboard/server` |
| 7.3 | 仪表盘页面开发 | Dashboard 组件 |
| 7.4 | 图表组件（ECharts） | 统计图表组件 |

**前端页面**：
- `/admin` - 仪表盘首页

---

### 阶段八：后台管理系统 - 用户管理 👥

**目标**：完成用户管理功能

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 8.1 | 获取用户列表 | `GET /api/admin/users` |
| 8.2 | 获取用户详情 | `GET /api/admin/users/:id` |
| 8.3 | 更新用户状态（禁用/启用） | `PUT /api/admin/users/:id/status` |
| 8.4 | 修改用户角色 | `PUT /api/admin/users/:id/role` |
| 8.5 | 用户管理页面 | 用户管理组件 |

**前端页面**：
- `/admin/users` - 用户管理页

---

### 阶段九：后台管理系统 - 系统设置 ⚙️

**目标**：完成系统配置功能

| 步骤 | 任务 | API 接口 |
|------|------|----------|
| 9.1 | 获取网站设置 | `GET /api/admin/settings` |
| 9.2 | 更新网站设置 | `PUT /api/admin/settings` |
| 9.3 | 获取邮件设置 | `GET /api/admin/settings/email` |
| 9.4 | 更新邮件设置 | `PUT /api/admin/settings/email` |
| 9.5 | 测试邮件发送 | `POST /api/admin/settings/email/test` |
| 9.6 | 系统设置页面 | 设置组件 |

**前端页面**：
- `/admin/settings` - 系统设置页

---

### 阶段十：项目完善与部署 🚀

**目标**：优化、测试、部署上线

| 步骤 | 任务 |
|------|------|
| 10.1 | 前端路由权限控制（管理员 vs 普通用户） |
| 10.2 | 全局错误处理和加载状态 |
| 10.3 | 响应式布局优化（移动端适配） |
| 10.4 | 前端项目构建配置 | `vite.config.ts` 优化 |
| 10.5 | 后端 Gin 配置优化 |
| 10.6 | 数据库索引优化 |
| 10.7 | API 接口文档（可选：Swagger） |
| 10.8 | Docker 部署配置（可选） |
| 10.9 | 生产环境 Nginx 配置 |
| 10.10 | 域名和 HTTPS 配置 |

---

## 五、开发顺序总结

```
┌─────────────────────────────────────────────────────────────┐
│  第1步：项目初始化（前后端框架、数据库）                      │
├─────────────────────────────────────────────────────────────┤
│  第2步：用户认证（注册、登录、验证码、JWT）                   │
├─────────────────────────────────────────────────────────────┤
│  第3步：博客管理（后台 CRUD、Markdown 编辑器）                │
├─────────────────────────────────────────────────────────────┤
│  第4步：博客展示（前台列表、详情、渲染）                      │
├─────────────────────────────────────────────────────────────┤
│  第5步：评论系统（提交、回复、审核）                          │
├─────────────────────────────────────────────────────────────┤
│  第6步：云盘系统（上传、下载、预览、目录）                    │
├─────────────────────────────────────────────────────────────┤
│  第7步：后台仪表盘（统计、监控图表）                          │
├─────────────────────────────────────────────────────────────┤
│  第8步：用户管理（后台）                                     │
├─────────────────────────────────────────────────────────────┤
│  第9步：系统设置                                             │
├─────────────────────────────────────────────────────────────┤
│  第10步：优化与部署                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 六、备注

1. 后续可根据实际开发情况进行功能增减
2. LaTeX 公式建议使用 KaTeX（渲染速度快）
3. Mermaid 图表需在渲染端引入对应 JS 库
4. 评论通知可考虑使用异步处理或后台任务
5. SQLite 适合中小型项目，日后可通过 GORM 轻松迁移到 MySQL/PostgreSQL



