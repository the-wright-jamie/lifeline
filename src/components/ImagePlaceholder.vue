<template>
  <div class="image">
    <img :class="class" :src="src" @load="ready = true" v-show="ready" />
    <slot v-if="!ready" />
  </div>
</template>

<script>
export default {
  props: ['src', 'class'],
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
