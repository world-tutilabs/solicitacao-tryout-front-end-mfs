<template>
    <div class="containerInput">
        <span>Motivo:</span>
        <select v-model="selected" class="inputSelect">
            <option disabled value="">Escolha um item</option>
            <option v-if="type === 'Modificacao'">Modificação de Molde</option>
            <option v-if="type === 'Modificacao'">Novo Produto do Molde</option>
            <option v-if="type === 'Tryout'">Novo Molde</option>
            <option v-if="type === 'Tryout'">Retroativo</option>
        </select>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:{
        type: String
    },
    data(){

        return{
            selected: "",
        }
    },

    methods:{ },
    watch:{
        selected(newValue){
            if (newValue){
                this.$emit('status', { newValue })
            
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.containerInput{
    display: grid;
    span{
    font-size: 0.8rem;
    font-weight: var(--bold);
    }
    .inputSelect{
        border: none;
        background-color: #ececec;
        font-size: 1rem;
        padding: 0.5rem 0.7rem;
        border-radius: var(--paddingInput);
        width: 10rem;
    }
}
</style>