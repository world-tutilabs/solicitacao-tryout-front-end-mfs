<template>
  <div>
    <div class="containerFrame">
      <div class="frameError">
        <img src="~assets/img/erro404mfs.svg" alt="">
      </div>
    </div>
    <Nuxt/>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
.containerFrame{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 60vh;
  background: var(--bg);
}
  .frameError{
    width: 40rem;
    min-width: 10rem;
    display: flex;
    padding: 2rem 2rem 0 2rem;
  }
  .frameError img{
    width: 100%;
  }
</style>
