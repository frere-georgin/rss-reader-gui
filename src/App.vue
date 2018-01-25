<style src="../static/lib.css"></style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'app',
  created: function() {
    let self = this;
    self.$store.dispatch("getBoards").then(response => {
        self.boards = self.$store.getters.boards;
    });
    self.$store.dispatch("getConfig").then(response => {
        self.config = self.$store.getters.config;
    });
  }
};
</script>
