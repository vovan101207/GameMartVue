<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  category: String,
  platform: String,
  price: Number,
  sale: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>

<template>
  <div class="Card">
    <div class="likeButton">
      <img  v-if="onClickFavorite" :src="!isFavorite? '/like-1.svg' : '/like-2.svg'" alt="like1">
    </div>
    <div class="imageUrl">
      <img :src="imageUrl" alt="imageUrl">
    </div>
    <div class="title">
      <p>{{ title }}</p>
      <span>{{ platform }}</span>
    </div>
    <div class="text">
      <div class="price">
        <span>Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img v-if="onClickAdd"  :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus">
    </div>

  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.Card {
  background-color: white;
  border: 1px solid rgb(241, 245, 249);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 300px;
  margin: 20px;
  padding: 15px;
  position: relative;
  user-select: none;
  cursor: pointer;
}
.Card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.likeButton {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.likeButton img {
  width: 40px;
  height: 40px;
}
.imageUrl img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid rgb(241, 245, 249);
  border-radius: 20px;
}
.title {
  padding: 15px 0;
  text-align: center;
}
.title p {
  font-size: 20px;
  font-weight: bold;
  color: rgb(31, 41, 55);
}
.title span {
  font-size: 14px;
  color: rgb(107, 114, 128);
}
.price {
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
}
.price span {
  font-size: 16px;
  color: rgb(107, 114, 128);
}
.price b {
  font-size: 22px;
  color: rgb(31, 41, 55);
  user-select: text;
}
.text {
  display: flex;
  gap: 130px;
}
</style>
