<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePostList, useCategories } from '@/composables/useBlog'

const { t } = useI18n()

const router = useRouter()
const { posts, total, loading, fetchPosts, search } = usePostList()
const { categories, fetchAll: fetchCats } = useCategories()
const keyword = ref('')
const activeCategoryId = ref<number | null>(null)

onMounted(async () => {
  await fetchCats()
  loadData()
})

const loadData = async () => {
  const params: Record<string, unknown> = {}
  if (activeCategoryId.value !== null) {
    params.category_id = activeCategoryId.value
  }
  await fetchPosts(params)
}

const filterByCategory = async (id: number | null) => {
  activeCategoryId.value = id
  await fetchPosts(id !== null ? { category_id: id } : {})
}

const handleSearch = () => search(keyword.value)

const formatDate = (d: string) => new Date(d).toLocaleDateString('zh-CN')

const goToPost = (slug: string) => router.push(`/blog/${slug}`)
</script>

<template>
  <div class="blog-page">
    <!-- 侧边栏 -->
    <aside class="blog-sidebar">
      <div class="sidebar-section">
        <h3 class="sidebar-title">
          <i class="pi pi-list"></i> {{ t('blog.categories') }}
        </h3>
        <div class="category-list">
          <button
            class="category-item"
            :class="{ active: activeCategoryId === null }"
            @click="filterByCategory(null)"
          >
            <i class="pi pi-align-justify"></i>
            {{ t('blog.allArticles') }}
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="category-item"
            :class="{ active: activeCategoryId === cat.id }"
            @click="filterByCategory(cat.id)"
          >
            <i class="pi pi-folder-open"></i>
            {{ cat.name }}
          </button>
        </div>
      </div>
    </aside>

    <!-- 主内容 -->
    <main class="blog-main">
      <div class="blog-header">
        <h1 class="page-title">{{ t('blog.title') }}</h1>
        <div class="search-box">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="keyword" :placeholder="t('blog.searchPlaceholder')" @keyup.enter="handleSearch" />
          </span>
          <Button icon="pi pi-search" severity="secondary" outlined @click="handleSearch" />
        </div>
      </div>

      <div v-if="loading" class="loading-wrap">
        <i class="pi pi-spin pi-spinner"></i>
        <span>{{ t('common.loading') }}</span>
      </div>

      <div v-else class="post-grid">
        <article
          v-for="post in posts"
          :key="post.id"
          class="post-card"
          @click="goToPost(post.slug)"
        >
          <div v-if="post.cover_image" class="post-cover">
            <img :src="post.cover_image" :alt="post.title" loading="lazy" />
            <Tag v-if="post.is_top" class="post-top-tag" severity="warn" :value="t('blog.pinned')" />
          </div>
          <div class="post-body">
            <div class="post-tags" v-if="post.tags?.length">
              <Tag v-for="tag in post.tags.slice(0, 2)" :key="tag.id"
                :value="tag.name" severity="secondary" class="post-tag" />
            </div>
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-summary">{{ post.summary || t('blog.noSummary') }}</p>
            <div class="post-meta">
              <span v-if="post.category"><i class="pi pi-folder"></i>{{ post.category.name }}</span>
              <span><i class="pi pi-eye"></i>{{ post.view_count }}</span>
              <span><i class="pi pi-calendar"></i>{{ formatDate(post.created_at) }}</span>
            </div>
          </div>
        </article>

        <div v-if="posts.length === 0" class="empty-state">
          <i class="pi pi-file"></i>
          <p>{{ t('blog.noArticles') }}</p>
        </div>
      </div>

      <div v-if="posts.length > 0 && total > posts.length" class="load-more">
        <Button :label="t('blog.loadMore')" icon="pi pi-arrow-down" severity="secondary" outlined />
      </div>
    </main>
  </div>
</template>

<style scoped>
.blog-page {
  display: flex;
  gap: 0;
  min-height: calc(100vh - 60px);
}

/* Sidebar */
.blog-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  padding: 1.5rem 1rem;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
.sidebar-section { margin-bottom: 2rem; }
.sidebar-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.category-list { display: flex; flex-direction: column; gap: 0.25rem; }
.category-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.8rem;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--sans);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
  width: 100%;
}
.category-item i { font-size: 0.85rem; color: var(--text-muted); }
.category-item:hover { background: var(--primary-50); color: var(--primary); }
.category-item:hover i { color: var(--primary); }
.category-item.active { background: var(--primary-50); color: var(--primary); font-weight: 600; }
.category-item.active i { color: var(--primary); }

/* Main */
.blog-main {
  flex: 1;
  padding: 2rem 2rem 3rem;
  max-width: calc(100% - 240px);
}
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}
.page-title { font-family: var(--heading); font-size: 1.5rem; font-weight: 700; color: var(--text-h); margin: 0; }
.search-box { display: flex; gap: 0.5rem; align-items: center; }
.search-box :deep(.p-inputtext) { min-width: 240px; }

/* Loading */
.loading-wrap { display: flex; align-items: center; gap: 0.75rem; padding: 3rem; color: var(--text-muted); justify-content: center; }

/* Post Grid */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}
.post-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}
.post-card:hover { border-color: var(--border-accent); box-shadow: var(--shadow); transform: translateY(-2px); }
.post-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
}
.post-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.post-card:hover .post-cover img { transform: scale(1.03); }
.post-top-tag { position: absolute; top: 0.5rem; right: 0.5rem; }
.post-body { padding: 1rem; }
.post-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
.post-tag { font-size: 0.7rem !important; }
.post-title {
  font-family: var(--heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-summary {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 0.75rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.post-meta span { display: flex; align-items: center; gap: 0.25rem; }

/* Empty */
.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--text-muted);
}
.empty-state i { font-size: 3rem; }
.empty-state p { margin: 0; }

/* Load More */
.load-more { display: flex; justify-content: center; margin-top: 2rem; }
</style>
