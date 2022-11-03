<template>
  <div :class="subTitleClass">
    <h4>{{ subTitle }}</h4>
  </div>
</template>

<script>
export default {
  name: 'SubTitle',
  props: ['subTitle', 'subTitleClass'],
}
</script>

<style lang="scss" scoped>
.subTitleBlack {
  color: var(--black_text);
}

.subTitleGreen {
  color: var(--green);
}
</style>
