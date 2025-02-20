<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as imagesApi from './api/images'
import { Image } from './types/images.ts'
import ImageCarousel from './components/ImageCarousel.vue'
import { PhLinkedinLogo, PhGithubLogo, PhTelegramLogo } from '@phosphor-icons/vue'

const images = ref<Image[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  try {
    errorMessage.value = null
    isLoading.value = true

    images.value = await imagesApi.getListImages({ limit: 15 })
  } catch (error) {
    errorMessage.value = error
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="main">
    <div class="container">
      <h1 class="header">Image Carousel</h1>

      <p v-if="errorMessage">Something went wrong. Error: {{ errorMessage }}</p>

      <p v-if="isLoading">Is loading...</p>
      <ImageCarousel v-else :images="images" />
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <p class="footer__content">Made by Mariia Hula</p>

      <div class="footer__social">
        <a href="https://github.com/hma-3" target="_blank">
          <PhGithubLogo :size="24" weight="fill" />
        </a>

        <a href="https://www.linkedin.com/in/mariia-hula-014001332/" target="_blank">
          <PhLinkedinLogo :size="24" weight="fill" />
        </a>

        <a href="https://t.me/mariia_hula" target="_blank">
          <PhTelegramLogo :size="24" weight="fill" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.main {
  padding-block: 24px;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.footer {
  padding-block: 24px;

  background-color: var(--color-background-mute);

  &__content {
    text-align: center;
    margin-bottom: 8px;
  }

  &__social {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style>
