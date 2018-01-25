
<template>
  <div class="board">
    <FeedAdd />
    <div v-if="activeBoard &&  activeBoard.feeds && activeBoard.feeds.length == 0" class="no-board">
      <div class="no-board-content">
        <i class="icon -clipboard-empty no-board-content-icon"/>
        <p class="no-board-content-text">Vous n'avez pas encore de feed pour cette board</p>
      </div>
    </div>
    <draggable v-if="activeBoard && activeBoard.feeds.length > 0" class="list-wrapper" :options="{handle: '.list-head'}" v-model="feeds" @start="drag=true" @end="drag=false">
      <List v-if="activeBoard && activeBoard.feeds && activeBoard.feeds.length > 0" v-for="(feed, index) in activeBoard.feeds" :key="feed" :feed="feed" />
    </draggable>
    <div class="board-background"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'board',
    data: () => {
      return {
        isDraggable: false
      }
    },
    computed: {
      feeds: {
        get() {
          return this.$store.getters.activeBoard.feeds;
        },
        set(value) {
          console.log("feed move", value);
          // i can't update correctly without setting the value passing by the getter
          //
          this.$store.getters.activeBoard.feeds = value;
          this.$store.dispatch('setFeeds', value);
        }
      },
      activeBoard() {
        return this.$store.getters.activeBoard;
      },
      config() {
          return this.$store.getters.config
      },
    },
    methods: {
      openModal: function() {
        this.$refs.addFeedModal.openModal();
      },
      closeModal: function() {
        this.$refs.addFeedModal.closeModal();
      }
    },
    created: function() {
      console.log(this.activeBoard);
    }
  };
</script>

<style compile="scss">

</style>
