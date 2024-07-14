<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>

<template>
  <div>
    <img  :src="imageUrl" :alt="title" />

    <div>
      <p>{{ title }}</p>

      <div>
        <b >{{ price }} руб.</b>
        <img
            @click="emit('onClickRemove')"
            src="/close.svg"
        />
      </div>
    </div>
  </div>
</template>
