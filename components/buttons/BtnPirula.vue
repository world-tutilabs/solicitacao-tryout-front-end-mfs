<template>
  <div>
    <button
      class="btn"
      :style="{ backgroundColor: verifyColor() }"
      @click="cancelBtn"
      v-if="this.color === 'pcp-approveds'"
    >
      {{ titleBtn }}
    </button>

    <button
      class="btn"
      :style="{ backgroundColor: verifyColor() }"
      @click="openModal"
      v-else
    >
      {{ titleBtn }}
    </button>

  </div>
</template>

<script>
import ModalFormPcp from "../modals/ModalFormPcp.vue";
import http from "../../services/pcp/pcp";
import ModalCancelSolicitation from "../modals/ModalEng.vue";

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

  methods: {
    cancelBtn: async function () {
      this.$toast.info("Solicitação Cancelada");
      this.homologate.status = 4;
      this.homologate.comment = "aaa";
      await http.deleteSolicitation(
        this.dataMold.homologation.id,
        this.homologate
      );
    },

    verifyColor() {
      if (
        this.color === "RRIM" ||
        this.color === "Aprovado" ||
        this.color === "pcp-analise"
      ) {
        return "var(--green)";
      } else if (this.color === "Reprovado") {
        return "var(--orange)";
      } else if (this.color === "cancelTryOut") {
        return "var(--red)";
      } else if (this.color === "pcp-approveds") {
        return "var(--blue)";
      }
    },
    openModal() {
      this.modalStatus = true;
    },
    closeModal() {
      this.modalStatus = false;
      setTimeout(() => {
        this.$emit("updateCard");
      }, 1000);
    },
  },
  components: { ModalFormPcp, ModalCancelSolicitation },
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
}
</style>
