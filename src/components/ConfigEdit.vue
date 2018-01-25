<template>
  <div class="edit-config">
    <Button class="button -only-icon" :click="openEditModal" >
      <i class="icon -cog"/>
    </Button>
    <Modal ref="editModal" :open="openEditModal" :close="closeEditModal">
      <div class="content">
        <h5>ConfigModal</h5>
        <p>isUserNew: {{config.isUserNew}}<br/>activeBoard: {{config.activeBoard}}<br/>lang: {{config.lang}}<br/>apiKeys: {{config.apiKeys}} <br/>articleCountLimift: {{config.articleCountLimit}}</p>
        <Button class="button" :click="() => { editConfig(config) }">
          <span>Oui</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'configEdit',
    computed: {
        config() {
          return this.$store.state.config;
        }
    },
    methods: {
      editConfig: function(config) {
        console.log("remove", config);
        this.$store.dispatch('setConfig', config);
        this.$refs.editModal.closeModal();
      },
      openEditModal: function() {
        this.$refs.editModal.openModal();
      },
      closeEditModal: function() {
        consolelog("close");
        this.$refs.editModal.closeModal();
      }
    },
    created: function() {
    }
  };
</script>

<style lang="scss">

</style>
