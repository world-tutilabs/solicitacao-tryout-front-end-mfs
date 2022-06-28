<template>
<div>
  <NuxtLink to="/">
    <img src="~/static/icons/arrowToBack.svg" alt="">
  </NuxtLink>
</div>
</template>
<script>
export default {
  props: {
    icon: String
  }
}
</script>

<style lang="scss" scoped>
  a{
    background: var(--white);
    border: 4px solid var(--blue);
    padding: .8rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    width: fit-content;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    
    transition: filter .2s;

    &:hover{
      filter: brightness(90%);
    }
  }
</style>


