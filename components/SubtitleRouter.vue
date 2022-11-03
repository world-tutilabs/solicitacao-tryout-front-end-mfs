<template>
  <div class="content">
    <h2>{{rota.status}}</h2>
  </div>
</template>

<script>
export default {
  data(){
    return{
      rota: this.$store.state.myRouter
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  background: var(--bg);
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;

    position: sticky;
    top: 10vh;
    z-index: 2;
}
</style>