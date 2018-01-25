<template>
  <div>
    <Button class="button -only-icon -no-border board-delete-button" :click="openDeleteModal" >
      <i class="icon -trash2"/>
    </Button>
    <Modal ref="deleteModal" :open="openDeleteModal" :close="closeDeleteModal">
      <div class="content">
        <h5>Etes vous sur de vouloir supprimer {{ board.title }} ?</h5>
        <p>Elle contient {{board.feeds.length}} feeds</p>
        <Button class="button" :click="() => { removeBoard(board) }">
          <span>Oui</span>
        </Button>
        <Button class="button" :click="closeDeleteModal">
          <span>En fait non</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'boardDelete',
    props: ['board', 'onDelete'],
    methods: {
      removeBoard: function(board) {
        console.log("remove", board);
        this.$store.dispatch('removeBoard', board);
        this.onDelete('');
        this.$refs.deleteModal.closeModal();
      },
      openDeleteModal: function() {
        if (this.board.feeds.length > 0) {
          this.$refs.deleteModal.openModal();
        }
        else {
          this.removeBoard(this.board);
        }
      },
      closeDeleteModal: function() {
        console.log("close");
        this.$refs.deleteModal.closeModal();
      }
    },
    created: function() {
    }
  };
</script>

<style>

</style>
