<template>
  <div class="image">
    <img :class="styling" :src="src" @load="ready = true" v-show="ready" />
    <slot v-if="!ready" />
  </div>
</template>

<script>
export default {
  props: ['src', 'styling'],
  data: () => ({
    ready: false
  }),
  watch: {
    src() {
      this.ready = false
    }
  }
}
</script>
