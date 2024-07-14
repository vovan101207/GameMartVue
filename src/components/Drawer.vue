<script setup>
import { ref, computed, inject } from 'vue'
import axios from 'axios'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const {cart, closeDrawer} = inject('cart')

const isLoading = ref(false)
const isOrderComplete = ref(false)
const orderId = ref(null)

const onClickOrder = async () => {
  try {
    isLoading.value = true
    const {data} = await axios.post(`https://05c6a0993d0f7050.mokky.dev/orders`, {
      items: cart.value
    })
    orderId.value = data.id
    isOrderComplete.value = true
    cart.value = []
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
}
</script>

<template>
  <div class="overlay">
    <div class="drawer">
      <DrawerHead @close-drawer="closeDrawer"/>
      <div v-if="cart.length">
        <CartItemList :items="cart"/>
        <div class="summary">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>{{ totalPrice }} руб. </b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>{{ vatPrice }} руб. </b>
            </li>
          </ul>
          <button :disabled="isLoading" @click="onClickOrder" class="order-button">Оформить заказ</button>
        </div>
      </div>
      <InfoBlock v-else :orderId="orderId" :isOrderComplete="isOrderComplete"/>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  background: white;
  width: 100%;
  max-width: 480px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
}

.summary {
  margin-top: 20px;
}

.summary ul {
  list-style: none;
  padding: 0;
}

.summary li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-button {
  padding: 15px 20px;
  background: #2a69ac;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.order-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
