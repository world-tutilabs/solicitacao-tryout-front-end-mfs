<template>
    <div class="containerInput">
        <span>Motivo:</span>
        <select v-model="selected" class="inputSelect">
            <option disabled value="">Escolha um item</option>
            <option>Modificação de Molde</option>
            <option>Novo Produto do Molde</option>
        </select>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){

        return{
            selected: ""
        }
    },

    methods:{}
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