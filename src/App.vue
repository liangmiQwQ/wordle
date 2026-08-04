<template>
  <div class="flex w-full h-screen items-center justify-center flex-col gap-2">
    <!-- Wordle List -->
    <div
      class="flex rounded-md border-1 border-slate-200 flex-col items-center justify-center gap-4"
      :style
    >
      <!-- Wordle -->
      <Wordle
        v-for="i in CHANCE_NUMBER"
        :word="word"
        :enabled="i - 1 === triedTime"
        @next="triedTime++"
        @success="triedTime = CHANCE_NUMBER + 10 /* Just magic number */"
      />
    </div>
    <span class="text-2xl" v-show="triedTime === CHANCE_NUMBER">{{ word }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { CHANCE_NUMBER, WORD_LENGTH, WORD_LIST } from './constant.ts'
import Wordle from './Wordle.vue'

const word = WORD_LIST.at(Date.now() % WORD_LIST.length)!

if (word.length !== WORD_LENGTH) {
  throw new Error(`Bad word ${word}`)
}

const style = {
  height: `${(60 + 16) * CHANCE_NUMBER - 16 + 50}px`,
  width: `${(60 + 8) * WORD_LENGTH - 8 + 50}px`
}

const triedTime = ref(0)
</script>
