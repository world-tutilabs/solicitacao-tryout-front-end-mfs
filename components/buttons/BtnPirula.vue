<template>
  <div>
    <button class="btn" :style="{backgroundColor: verifyColor()}">{{titleBtn}}</button>
  </div>
</template>

<script>
export default {
  name: 'BtnPirula',
  props: ['titleBtn', 'color', 'modal'],

  data() {
    return{
      colorBtn: ""
    }
  },


  methods: {

    verifyColor (){
      if(this.color === "RRIM"  || this.color === "Aprovado" || this.color === "pcp-analise" ){
        return 'var(--green)'
      }else if(this.color === "Reprovado") {
        return 'var(--orange)'
      } else if(this.color === "CancelTryOut"){
        return 'var(--red)'
      }
      else if(this.color === "PCP"){
        return 'var(--blue)'
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
