<template>
    <div class="loading-content">
      <h3 class="title">MFS</h3>
      <h4 class="name-module">Solicitação de TryOut</h4>
      <span class="loader"></span>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
  
  })
  </script>
  
  <style lang="scss" scoped>
  .loading-content {
    width: 100vw;
    height: 100vh;
    background-color: rgba(225, 221, 221, 0.355);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 10000;
  }
  .quadrado {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    animation: cubo-transform 2s infinite;
  }
  .title {
    color: black;
    font-size: 4rem;
    animation: title-transform 1s;
    margin-bottom: 0.1rem;
    
  }
  .displayLoading {
    display: none;
  }
  .version {
    color: black;
  }.loader {
    width: 100%;
    height: 1rem;
    display: inline-block;
    position: relative;
    overflow: hidden;
  }
  .name-module {
    color: black;
    margin-bottom: 1rem;
  }
  .loader::after {
    content: '';  
    width: 96px;
    height: 1rem;
    background: var(--green);
    position: absolute;
    border-radius: 0.3rem;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: hitZak 1s ease-in-out infinite alternate;
  }
  @keyframes hitZak {
    0% {
      left: 0;
      background: blue;
      transform: translateX(-1%);
    }
    50% {
      left: 50%;
      background: green;
      transform: translateX(-55%);
    }
    100% {
      left: 100%;
      background: red;
      transform: translateX(-99%);
    }
  }
  
  </style>