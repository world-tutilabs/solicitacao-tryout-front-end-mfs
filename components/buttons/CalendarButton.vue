<template>
  <div>
    <NuxtLink to="/calendar">
      <img src="~/static/icons/iconCalendar.svg" alt="" />
    </NuxtLink>
  </div>
</template>
<script>
export default {
  props: {
    icon: String,
  },
}
</script>

<style lang="scss" scoped>
div {
  padding-left: 1%;
  

  a {
    background: var(--white);
    border: 4px solid var(--blue);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 0.6rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(90%);
    }

    img {
      width: 3.125rem;
    }
  }

  @media (max-width: 768px) {
    border-left: 2px solid var(--gray);
  }
}
</style>


