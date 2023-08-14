<template>
    <button class="btn">
      {{ titleBtn }}
    </button>
</template>


<script>
// import http from "../../services/pcp/pcp";

export default {
  name: "BtnPirula",
  props: {
    titleBtn: String,
    color: String,
    dataMold: Object,
  },

  data() {
    return {
      colorBtn: "",
      modalStatus: false,

      homologate: {
        status: 0,
        comment: "",
      },
      dataCancel: [],
    };
  },

};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 148px;
  height: 40px;
  padding: var(--paddingInput);
  border-radius: 0.25rem;
  color: var(--white);
  font-weight: var(--bold);
  font-size: 1rem;
  background: var(--green);
  margin-top: 15px;
}
</style>
