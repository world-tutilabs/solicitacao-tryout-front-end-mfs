<template>
  <div class="containerLoad">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.containerLoad {
  position: fixed;
  top: 7vh;
  left: 0;
  width: 100%;
  height: 0.7rem;
  z-index: 9999;
}
.loading {
  height: 100%;

  animation: loading 1.3s infinite ease-in-out;
  transform-origin: center;
  transform-box: fill-box;
}
@keyframes loading {
  0% {
    width: 0%;
    margin-left: 0%;
    background: #6be292;
  }
  25% {
  }
  50% {
    width: 100%;
    margin-left: 0%;
    background: #4ec074;
  }
  75% {
    background: var(--green);
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
}
</style>
