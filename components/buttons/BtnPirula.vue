<template>
  <div>
    <button class="btn" :style="{ backgroundColor: verifyColor() }" @click="modalStatus = !modalStatus">{{ titleBtn
    }}</button>

    <ModalForm :displayModal="modalStatus" @closeModal="closeModal" :dataRRIM="dataMold" v-if="this.color === 'RRIM'"/>

    <ModalFormPcp :displayModal="modalStatus" @closeModal="closeModal"  v-else :dataPCP="dataMold"/>


  </div>
</template>

<script>
import ModalFormPcp from '../modals/ModalFormPcp.vue'
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
        };
    },
    methods: {
        verifyColor() {
            if (this.color === "RRIM" || this.color === "Aprovado" || this.color === "pcp-analise") {
                return "var(--green)";
            }
            else if (this.color === "Reprovado") {
                return "var(--orange)";
            }
            else if (this.color === "cancelTryOut") {
                return "var(--red)";
            }
            else if (this.color === "pcp-approveds") {
                return "var(--blue)";
            }
        },
        closeModal() {
            this.modalStatus = !this.modalStatus;
        }
    },
    components: { ModalFormPcp }
}
</script>

<style lang="scss" scoped>
.btn {
  min-width: 148px;
  height: 40px;
  padding: var(--paddingInput);
  border-radius: 2rem;
  color: var(--white);
  font-weight: var(--bold);
  font-size: 1rem;
}
</style>
