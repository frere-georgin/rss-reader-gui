<template>
  <div class="nav">
    <draggable class="nav-content" v-model="boards" :options="{draggable:'.nav-link', handle: '.nav-link-title'}" >
      <div v-bind:class="{ 'nav-link': true, 'active': board.title == config.activeBoard }" v-for="board in boards" :key="board" :board="board">
        <TitleEdit name="board" :ref="board" :validate="(newValue) => { editBoard(board, newValue) }" :original="board.title" :value="board.title">
          <h3 class="nav-link-title" v-on:click="() => { update(board.title) }">
            {{ board.title }}
            <span class="nav-link-title-desc"> {{ board.feeds.length }} </span>
          </h3>
        </TitleEdit>
        <BoardDelete :onDelete="() => { update('') }" v-if="boards.length > 1" :board="board"/>
      </div>
    </draggable>
    <BoardAdd :onAdd="(title) => { update(title) }" ref="boardForm"/>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'nav',
    computed: {
      activeBoard() {
          return this.$store.getters.activeBoard
      },
      config() {
          return this.$store.getters.config
      },
      boards: {
        get() {
            return this.$store.state.boards
        },
        set(value) {
          console.log("move", value);
          this.$store.dispatch('setBoards', value);
        }
      }
    },
    sockets: {
      connect: function() {
        // console.log('socket connected');
      }
    },
    methods: {
      removeBoard: function(board) {
        console.log("remove", board);
        this.$store.dispatch('removeBoard', board);
      },
      editBoard: function(board, newValue) {
        console.log("edit", board);
        board.title = newValue;
        this.update(newValue);
        this.$store.dispatch('editBoard', board);
      },
      update: function(title) {
        let self = this;
        console.log("update", title);
        self.boards.map(function(board) {
          if (title == board.title) {
            self.config.activeBoard = board.title;
            self.$store.dispatch('setConfig', self.config);
          }
        });
      }
    },
    created: function() {
      let self = this;
    }
  };

</script>

<style compile="scss">


</style>
