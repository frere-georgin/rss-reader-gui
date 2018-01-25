<template>

  <div>
    <Button class="button board-add" ref="boardAddButton" :click="() => { openAddBoardModal() }">
      <i class="icon -plus"/>
      <span>Nouvelle board</span>
    </Button>
    <Modal ref="addBoardModal" :open="openAddBoardModal">
      <form v-on:submit.prevent="addBoard" class="content">
        <fieldset v-bind:class="{'-has-tag': errors.has('title'), '-large': true}">
          <label>Title</label>
          <input name="title" v-validate="'required|alpha_num|verify_names'" v-model="board.title" type="text" placeholder="Title" />
          <div v-show="errors.has('title')" class="tag visible -line-danger -large -top -pointing">
            <span>{{ errors.first('title') }}</span>
          </div>
        </fieldset>
        <button :disabled="errors.any()" class="button -success">Validate</button>
      </form>
    </Modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';

  export default {
    name: 'boardAdd',
    props: ['onAdd'],
    computed: {
        board() {
          return this.$store.getters.newBoard;
        },
        names() {
          return this.$store.getters.boardNames;
        },
        config() {
          return this.$store.getters.config;
        }
    },
    methods: {
      addBoard: function() {
        let self = this;
        this.$validator.validateAll().then(result => {
          if (result) {
            self.$store.dispatch('addBoard', self.board);
            self.$store.dispatch('clearBoard');
            self.$refs.addBoardModal.closeModal();
            console.log(self.board);
            self.onAdd(self.board.title);
          }
        })
      },
      openAddBoardModal: function() {
        this.$refs.addBoardModal.openModal();
      },
      closeAddBoardModal: function() {
        this.$refs.addBoardModal.closeModal();
      },
    },
    mounted: function() {
      let self = this;
      Vue.nextTick(() => {
        // console.log(self.$el.clientHeight, self.$refs.boardAddButton.height);
      });
      self.$validator.extend('verify_names', {
        getMessage: (field) => `The ${field} is already taken.`,
        validate: (value) => new Promise(resolve => {
            resolve({
              valid: value && ! ~self.names.indexOf(value)
            });
        })
      });
      self.$validator.validateAll();

    }
  };
</script>

<style>
  fieldset {
    display: block;
  }
</style>
