<template>
  <div>
    <button class="btn" :style="{ backgroundColor: verifyColor() }" @click="openModal">{{ titleBtn
    }}</button>

    <ModalForm :displayModal="modalStatus" @closeModal="closeModal" :dataRRIM="dataMold"/>
  </div>
</template>

<script>
export default {
  name: 'BtnPirula',
  props: {
    titleBtn: String,
    color: String,
    dataMold: Object,
  },

  data() {
    return {
      colorBtn: "",
      modalStatus: false,
    }
  },


  methods: {
    verifyColor() {
      if (this.color === "RRIM" || this.color === "Aprovado" || this.color === "pcp-analise") {
        return 'var(--green)'
      } else if (this.color === "Reprovado") {
        return 'var(--orange)'
      } else if (this.color === "CancelTryOut") {
        return 'var(--red)'
      }
      else if (this.color === "PCP") {
        return 'var(--blue)'
      }
    },
    openModal(){
      this.modalStatus = true
    },
    closeModal() {
      this.modalStatus = false
    }
  },
  watch:{
    modalStatus(newValue){
      let scrollBody = document.body
      if(newValue == true){
        scrollBody.style.overflow = 'hidden'
      }else{
        scrollBody.style.overflow = 'scroll'
      }
    }
  }
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
