<template>
    <div>
    <button
      class="btn"
      @click="cancelBtn"
      v-if="this.color === 'pcp-approveds'"
    >
      {{ titleBtn }}
    </button>

    <button
      class="btn"
      @click="openModal"
      v-else
    >
      {{ titleBtn }}
    </button>
        <ModalSolicitarModificacoes
        :displayModal="modalStatus"
        @closeModal="closeModal"
        :dataRRIM="dataMold"
        />
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

  watch: {
    modalStatus(newValue) {
      let scrollBody = document.body;
      if (newValue == true) {
        scrollBody.style.overflowY = "hidden";
      } else {
        scrollBody.style.overflowY = "scroll";
      }
    },
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
  background: var(--green);
}
</style>
