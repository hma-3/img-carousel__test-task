<script setup lang="ts">
import { defineProps, ref, computed, onMounted, onUnmounted } from 'vue'
import { type Image } from '../types/images.ts'
import { PhCaretRight, PhCaretLeft } from '@phosphor-icons/vue'
import SelectedImgUrlsList from './SelectedImgUrlsList.vue'

const { images } = defineProps<{ images: Image[] }>()

const currentIndex = ref(0)
const viewportWidth = ref(window.innerWidth)
const selectedImageUrls = ref<string[]>([])

const visibleImagesCount = computed(() => {
  if (viewportWidth.value < 768) {
    return 1
  }
  if (viewportWidth.value < 1200) {
    return 3
  }

  return 5
})

const getSmallerPicture = (url: string) => {
  const result = url.split('/')

  if (visibleImagesCount.value === 5) {
    result[result.length - 2] = '300'
    result[result.length - 1] = '200'
  } else if (visibleImagesCount.value === 3) {
    result[result.length - 2] = '350'
    result[result.length - 1] = '250'
  } else {
    result[result.length - 2] = '590'
    result[result.length - 1] = '400'
  }

  return result.join('/')
}

const imageWidth = computed(() => `${100 / visibleImagesCount.value}%`)

const transformValue = computed(() => {
  return `translateX(-${currentIndex.value * (100 / visibleImagesCount.value)}%)`
})

const nextImg = () => {
  currentIndex.value = (currentIndex.value + 1) % (images.length - visibleImagesCount.value + 1)
}

const prevImg = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? images.length - visibleImagesCount.value
      : (currentIndex.value - 1 + images.length) % images.length
}

const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}

const toggleSelection = (url: string) => {
  selectedImageUrls.value = selectedImageUrls.value.includes(url)
    ? selectedImageUrls.value.filter((currUrl) => currUrl !== url)
    : [...selectedImageUrls.value, url]
}

onMounted(() => {
  window.addEventListener('resize', updateViewportWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportWidth)
})
</script>

<template>
  <div class="carousel">
    <button @click="prevImg" class="carousel__control">
      <PhCaretLeft :size="32" weight="fill" color="var(--color-text)" />
    </button>

    <div class="carousel__container">
      <ul class="carousel__list" :style="{ transform: transformValue }">
        <li
          v-for="image of images"
          :key="image.id"
          class="carousel__item"
          @click="toggleSelection(image.url)"
        >
          <img
            :src="getSmallerPicture(image.download_url)"
            :alt="`Image id: ${image.id}. Author: ${image.author}`"
            class="carousel__image"
            :class="{ 'carousel__image--selected': selectedImageUrls.includes(image.url) }"
            loading="lazy"
          />
        </li>
      </ul>
    </div>

    <button @click="nextImg" class="carousel__control">
      <PhCaretRight :size="32" weight="fill" color="var(--color-text)" />
    </button>
  </div>

  <SelectedImgUrlsList :selectedImageUrls="selectedImageUrls" />
</template>

<style lang="scss" scoped>
$gap: 16px;

.carousel {
  display: flex;
  margin-bottom: 24px;

  &__container {
    overflow: hidden;
    padding-left: $gap;
  }

  &__list {
    display: flex;
    transition: transform 0.3s ease-in-out;
    column-gap: $gap;
  }

  &__item {
    flex: 0 0 auto;
    transition: transform 0.2s;

    width: calc(v-bind(imageWidth) - $gap);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    filter: brightness(1);
    border: 2px solid transparent;

    transition: all 0.3s ease-in-out;

    &--selected {
      border: 2px solid var(--color-accent);
      border-radius: 5px;
    }

    &:hover {
      filter: brightness(0.7);
    }
  }

  &__control {
    padding: 0;

    border: none;
    background-color: var(--color-background-mute);

    transition: background-color 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: var(--color-background-soft);
    }
  }
}
</style>
