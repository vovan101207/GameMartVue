<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div>
    <img  :src="imageUrl" alt="Info image" />
    <h2 >{{ title }}</h2>
    <p >{{ description }}</p>
  </div>
</template>
