<script setup lang="ts">
import { setTabTitle } from '@/assets/ts/utils'
import ErrorMessage from '@/components/ErrorMessage.vue'

setTabTitle('Thanks!')
</script>

<template>
  <MegaHeader />
  <ErrorMessage
    header="Hey! Secret Page!"
    message="Thank you for using Lifeline! If it has helped you in anyway, please feel free to reach out and say hi - I'd love to hear about how you're using it. You can find my contact details on my GitHub page."
  />
</template>
