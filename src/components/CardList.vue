<script setup>
import Card from './Card.vue';

const props = defineProps({
  items: Array,
  isFavorites: Boolean
});

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="container">
    <div class="CardList">
      <Card v-for="item in props.items"
            :key="item.id"
            :id="item.id"
            :imageUrl="item.imageUrl"
            :title="item.title"
            :platform="item.platform"
            :price="item.price"
            :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
            :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
            :isFavorite="item.isFavorite"
            :isAdded="item.isAdded"/>
    </div>
  </div>

</template>

<style scoped>
.CardList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
