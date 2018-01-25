<template>
  <div class="dashboard" v-bind:class="{ loading: isLoading }">
    <ConfigEdit />
    <Welcome v-if="config && config.isUserNew"/>
    <Nav v-if="boards" />
    <Board v-if="boards" />
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'dashboard',
    data: () => {
      return {
        isLoading: true
      }
    },
    computed: {
      activeBoard() {
          return this.$store.getters.activeBoard
      },
      boards() {
          return this.$store.state.boards
      },
      config() {
          return this.$store.getters.config
      }
    },
    sockets: {
      connect: function() {
        console.log('socket connected')
      }
    },
    mounted: function() {
      this.isLoading = false;
    }
  };

</script>

<style compile="scss">

  /*@import '../style/style.scss';*/

</style>
