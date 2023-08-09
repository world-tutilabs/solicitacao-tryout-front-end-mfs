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

  // methods: {
  //   cancelBtn: async function () {
  //     this.$toast.info("Solicitação Cancelada");
  //     this.homologate.status = 4;
  //     this.homologate.comment = "aaa";
  //     await http.deleteSolicitation(
  //       this.dataMold.homologation.id,
  //       this.homologate
  //     );
  //   },


  //   openModal() {
  //     this.modalStatus = true;
  //   },
  //   closeModal() {
  //     this.modalStatus = false;
  //     setTimeout(() => {
  //       this.$emit("updateCard");
  //     }, 1000);
  //   },
  // },
  // components: { ModalFormPcp, ModalCancelSolicitation },
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
}
</style>
