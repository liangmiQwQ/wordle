<template>
  <div
    class="flex items-center justify-center w-15 h-15 rounded font-sans text-4xl text-white duration-300"
    :style="backgroundStyle"
  >
    {{ getLetter(letter) }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { StyleValue } from 'vue'

import type { Letter } from './types.ts'

const { letter } = defineProps<{
  letter: Letter
}>()

const backgroundStyle = computed(() => getBackgroundColor(letter))

function getLetter(letter: Letter): string | undefined {
  if (typeof letter === 'object') {
    return letter.value
  } else if (typeof letter === 'string' && letter.length === 1) {
    return letter
  }
  return undefined
}

function getBackgroundColor(letter: Letter): StyleValue {
  if (typeof letter === 'object') {
    if (letter.status === 'WRONG') {
      return { color: 'white', backgroundColor: 'rgb(226,232,240)' }
    } else if (letter.status === 'EXIST') {
      return { backgroundColor: 'rgb(255,210,48)' }
    }
    return { backgroundColor: 'oklch(76.8% 0.233 130.85)' }
  }
  return { backgroundColor: 'rgb(203,213,226)' }
}
</script>
