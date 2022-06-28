<template>
  <div>
    <footer>
      <img src="~/static/logo/Tutilabs-logo.png" alt="">
    </footer>
  </div>
  
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  footer{
    width: 100%;
    height: 10vh;
    background: #012A35;
    display: flex;
    align-items: center;
    padding: 0 var(--negativeSpace);

    img{
      width: 7rem;
    }
  }
</style>
