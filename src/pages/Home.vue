<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://05c6a0993d0f7050.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://05c6a0993d0f7050.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://05c6a0993d0f7050.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)
      if (favorite) {
        return {
          ...item,
          isFavorite: true,
          favoriteId: favorite.id
        }
      }
      return item
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`https://05c6a0993d0f7050.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="hero">
        <h2 class="title">Все товары</h2>
        <div class="controls">
          <select @change="onChangeSelect" id="sortSelect" class="select">
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="search">
            <img class="search-icon" src="/search.svg" alt="search" />
            <input @input="onChangeSearchInput" id="searchInput" class="search-input" placeholder="Поиск..." />
          </div>
        </div>
      </div>
      <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
  </main>
</template>

<style scoped>
.main {
  border-top: 1px solid rgb(226 232 240);
  margin-top: 110px;
}

.container {
  padding: 10px;
  max-width: 1400px;
  margin: 0 auto;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 16px;
}

.select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: white;
}

.search {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 8px;
  width: 16px;
  height: 16px;
}

.search-input {
  padding: 8px 12px 8px 32px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #999;
}
</style>
