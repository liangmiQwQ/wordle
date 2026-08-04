<template>
  <div class="flex flex-row gap-2 justify-center select-none">
    <Letter v-for="i in WORD_LENGTH" :letter="letterList[i - 1]"></Letter>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { ALLOW_LIST, WORD_LENGTH } from './constant.ts'
import Letter from './Letter.vue'
import type { LetterStatus, Letter as LetterType } from './types.ts'

const { word, enabled } = defineProps<{ word: string; enabled: boolean }>()

const emit = defineEmits<{
  next: []
  success: []
}>()

const listening = ref(enabled)
watch(
  () => enabled,
  nv => {
    listening.value = nv
  }
)
const letterList = ref<LetterType[]>([])

function submitLetterList() {
  if (WORD_LENGTH !== letterList.value.length) {
    throw new Error('Bad word')
  }
  if (!ALLOW_LIST.includes(letterList.value.join('').toLowerCase())) {
    return
  }
  listening.value = false
  let rightNumber = 0
  const upperCaseWord = word.toUpperCase()

  const letterTable: Record<string, number> = {}
  for (const letter of upperCaseWord) {
    if (typeof letterTable[letter] === 'number') {
      letterTable[letter] += 1
    } else {
      letterTable[letter] = 1
    }
  }

  letterList.value = (letterList.value as string[]).map((ov, index) => {
    let status: LetterStatus
    if (ov === upperCaseWord[index]) {
      rightNumber += 1
      status = 'CORRECT'
    } else if (typeof letterTable[ov] === 'number' && letterTable[ov] > 0) {
      letterTable[ov] -= 1
      status = 'EXIST'
    } else {
      status = 'WRONG'
    }

    return { value: ov, status }
  })

  if (rightNumber === WORD_LENGTH) {
    emit('success')
  } else {
    emit('next')
  }
}

const keydownHandler: (event: KeyboardEvent) => void = event => {
  if (!event.altKey && !event.metaKey && !event.ctrlKey) {
    if (
      event.key.length === 1 &&
      /^[a-z]$/i.test(event.key) &&
      letterList.value.length !== WORD_LENGTH
    ) {
      letterList.value.push(event.key.toUpperCase())
    } else if (event.key === 'Backspace' && letterList.value.length > 0) {
      letterList.value.length -= 1
    } else if (event.key === 'Enter' && letterList.value.length === WORD_LENGTH) {
      submitLetterList()
    }
  }
}

watch(
  listening,
  (nv, ov) => {
    if (nv) {
      globalThis.addEventListener('keydown', keydownHandler)
    } else {
      globalThis.removeEventListener('keydown', keydownHandler)
    }
  },
  { immediate: true }
)
</script>

<style></style>
