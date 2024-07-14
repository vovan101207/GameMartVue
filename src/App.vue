<script setup>
import { ref, provide, watch, computed } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
  if (index !== -1) {
    cart.value.splice(index, 1)
    item.isAdded = false
  }
}

watch(
    cart,
    () => {
      localStorage.setItem('cart', JSON.stringify(cart.value))
    },
    { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <div id="app">
    <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice"/>

    <div>
      <Header :total-price="totalPrice" @open-drawer="openDrawer"/>

      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
