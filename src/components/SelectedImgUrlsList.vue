<script setup lang="ts">
import { defineProps } from 'vue'

const { selectedImageUrls } = defineProps<{ selectedImageUrls: string[] }>()
</script>

<template>
  <h2>Selected image URLs:</h2>

  <TransitionGroup name="list" tag="ul" class="list">
    <li v-for="url of selectedImageUrls" :key="url" class="list__item">
      <a :href="url" target="_blank">{{ url }}</a>
    </li>
  </TransitionGroup>

  <Transition name="empty-list">
    <p v-if="!selectedImageUrls.length">
      There is no selected images. Click on the image to select.
    </p>
  </Transition>
</template>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active,
.empty-list-move,
.empty-list-enter-active,
.empty-list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.empty-list-enter-from,
.empty-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active,
.list-enter-active,
.empty-list-leave-active,
.empty-list-enter-active {
  position: absolute;
}

.list {
  padding-left: 36px;

  &__item {
    list-style-type: disc;
  }
}
</style>
