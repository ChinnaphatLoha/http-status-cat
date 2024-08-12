<script setup lang="ts">
import { ref, computed } from 'vue'
import { allHttpStatusCode } from './constants/httpStatusCode'

// Constants
const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/750x600?text=No+Meow+Found'

// Reactive state variables
const httpStatusCode = ref('')
const warningMessage = ref('')
const showReadMore = ref(false)
const imageSrc = ref('')
const isPlaceholder = ref(true)
const isValidCode = computed(() => isValidStatusCode(httpStatusCode.value.trim()))

// Handle image load error
const handleImageError = () => {
  setPlaceholderImage()
}

// Set placeholder image
const setPlaceholderImage = () => {
  imageSrc.value = PLACEHOLDER_IMAGE_URL
  isPlaceholder.value = true
}

// Validate input and update image
const handleSubmit = () => {
  const statusCode = httpStatusCode.value.trim()
  if (statusCode === '') return
  if (!isValidStatusCode(statusCode)) {
    warningMessage.value = "Whoa! That's not a valid cat status!"
    setPlaceholderImage()
    shakeScreen()
    showReadMore.value = false
  } else {
    warningMessage.value = ''
    imageSrc.value = `https://http.cat/${statusCode}`
    isPlaceholder.value = false
    showReadMore.value = true
  }
}

// Check if status code is valid
const isValidStatusCode = (statusCode: string) => {
  return allHttpStatusCode.some((code) => code.status.toString() === statusCode)
}

// Shake the screen to indicate invalid status code
const shakeScreen = () => {
  const main = document.querySelector('.main')
  main?.classList.add('shake')
  setTimeout(() => {
    main?.classList.remove('shake')
  }, 500)
}

// Shake the form to indicate invalid status code
const shakeForm = () => {
  const form = document.querySelector('form')
  form?.classList.add('shake')
  setTimeout(() => {
    form?.classList.remove('shake')
  }, 500)
}
</script>

<template>
  <div
    class="main flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 md:p-12"
  >
    <h1 class="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center animate-pulse">
      Search for meow with
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/"
        target="_blank"
        class="underline"
      >
        HTTP status code
      </a>
    </h1>

    <div class="flex flex-col items-center w-2/3 md:w-1/3">
      <p
        v-if="warningMessage && !isValidCode"
        class="text-red-500 text-sm md:text-base mb-4 italic"
      >
        {{ warningMessage }}
      </p>

      <form @submit.prevent="handleSubmit" class="flex items-center justify-center w-full">
        <input
          v-model="httpStatusCode"
          type="text"
          placeholder="Enter HTTP status code"
          class="flex-grow p-4 mb-2 border-2 border-black rounded-l-lg focus:outline-none text-center"
          @input="
            () => {
              if (!isValidCode) {
                shakeForm()
              } else {
                warningMessage = ''
              }
            }
          "
        />
        <button
          type="submit"
          @click="handleSubmit"
          class="w-[75px] px-4 py-2 mb-2 rounded-r-lg bg-black text-white text-xl"
        >
          {{ isValidCode ? '😻' : '😾' }}
        </button>
      </form>
    </div>

    <div :class="['relative mb-10 md:mb-16 mt-10', isPlaceholder ? '' : 'group']">
      <a
        v-if="!isPlaceholder"
        :href="`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${httpStatusCode}`"
        target="_blank"
        class="relative"
      >
        <img
          :src="imageSrc"
          alt="Meow will be here after you search"
          class="max-w-xs md:max-w-md mx-auto rounded-lg shadow-lg transform transition duration-500 ease-in-out group-hover:scale-110"
          @error="handleImageError"
        />
        <div
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold text-xl opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"
        >
          READ MORE
        </div>
      </a>
      <img
        v-else
        :src="imageSrc"
        alt="Meow will be here after you search"
        class="max-w-xs md:max-w-md mx-auto rounded-lg shadow-lg"
        @error="handleImageError"
      />
    </div>
  </div>
</template>

<style scoped>
.main {
  transition: transform 0.5s;
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-10px);
  }
  40%,
  80% {
    transform: translateX(10px);
  }
}

input,
button {
  height: 3rem; /* Ensure input and button have equal height */
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
