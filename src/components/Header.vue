<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
<header class="header">
  <div class="container">
    <div class="logo">
      <img src="/logo.png" alt="logo">
    </div>
    <div class="menu">
      <ul class="menu-list">
        <li class="menu-item">
          <img @click="() => emit('openDrawer')" src="/cart.svg" alt="Cart" />
          <b>{{ totalPrice }}руб.</b>
        </li>
        <router-link to="/favorites">
          <li class="menu-item">
            <img src="/heart.svg" alt="Heart" />
            <span>Закладки</span>
          </li>
        </router-link>

        <li class="menu-item">
          <img src="/profile.svg" alt="Profile" />
          <span>Профиль</span>
        </li>
      </ul>
    </div>
  </div>
</header>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}
.logo {
  display: flex;
  gap: 4px;
  font-size: 16px;
  align-items: center;
  position: absolute;
  left: 0;
}

.logo img{
  width: 150px;
  height: 100px;
  user-select: none;
}

.header {
  position: relative;
}
.header .container {
  display: flex;
  align-items: center;
  position: relative;
  top: 50px;
}

.menu {
  position: absolute;
  right: 0;
}

.menu-list {
  display: flex;
  list-style: none;
  gap: 40px;
}
.menu-item {
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  color: rgb(107 114 128);
  user-select: none;
}
.menu-item b {
  user-select: text;
}
.menu-item:hover {
  color: black;
}


</style>