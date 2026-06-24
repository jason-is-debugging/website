import { ref } from 'vue'
import type { Ref } from 'vue'

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Post {
  id: number
  title: string
  slug: string
  summary?: string
  cover_image?: string
  is_top: boolean
  view_count: number
  created_at: string
  category?: Category
  tags?: Tag[]
}

export function usePostList() {
  const posts: Ref<Post[]> = ref([])
  const total = ref(0)
  const loading = ref(false)

  async function fetchPosts(_params?: Record<string, unknown>) {
    loading.value = true
    try {
      // Mock data - replace with actual API call
      posts.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  async function search(_keyword: string) {
    await fetchPosts({ search: _keyword })
  }

  return {
    posts,
    total,
    loading,
    fetchPosts,
    search,
  }
}

export function useCategories() {
  const categories: Ref<Category[]> = ref([])

  async function fetchAll() {
    // Mock data - replace with actual API call
    categories.value = []
  }

  return {
    categories,
    fetchAll,
  }
}
