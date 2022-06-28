<template>
    <div>
        <h1>{{teste}}</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{
            teste: 'testando TS'
        }
    }
})
</script>

<style lang="scss" scoped>

</style>