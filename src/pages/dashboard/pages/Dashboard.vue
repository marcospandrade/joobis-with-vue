<template>
    <div>
        <h2> Dashboard do {{ usuarioLogado.id }} </h2> 
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'dashboard',
    computed: {
        ...mapState('auth', ['usuarioLogado'])
    }
}
</script>