<template>
  <div class="requestButton">
    <button class="btn-request">
      <p>{{ titleBtn }}</p>
    </button>
  </div>
</template>
<script>
export default {
  props: ['link', 'titleBtn'],
}
</script>

<style lang="scss" scoped>
.requestButton {
  width: 30%;

  .btn-request {
    padding: 1rem;
    background: var(--green);
    color: var(--white);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    width: 100%;
    font-weight: 600;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(90%);
    }
  }

  @media screen and (min-width: 650px) and (max-width:922px) {
    width: 40%;
  }

  @media (max-width: 650px) {
    width: 100%;
  }
}
</style>


