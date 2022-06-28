<template>
  <div>
    <h2 :class="titleClass">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: ['title', 'titleClass'],
}
</script>

<style lang="scss" scoped>

.titleGreen {
  color: var(--green);
}

.titleBlack {
  color: var(--black_text);
}
</style>
