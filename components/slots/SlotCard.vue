<template>
  <div class="containerSlot">
    <div class="cardInput">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlotCard',
}
</script>

<style lang="scss" scoped>
.containerSlot {
  position: relative;
  width: 100%;
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 1.5rem;
  border-radius: var(--radius);
  .cardInput {
    position: relative;
    width: 100%;
    padding: 1rem;
    border-radius: var(--radius);
    gap: 1rem;
  }
}
</style>
