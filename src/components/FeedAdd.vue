<template>
  <div class="add-feed">
    <Button class="button add-feed-button" :click="() => { openAddFeedModal() }">
      <i class="icon -plus"/>
      <span>Nouveau feed</span>
    </Button>
    <Modal ref="addFeedModal" :open="openAddFeedModal">
      <form v-on:submit.prevent="addFeed" class="content">
        <fieldset v-bind:class="{'-has-tag': errors.has('title'), '-large': true}">
          <label>Title</label>
          <input name="title" v-validate="'required|alpha_num|verify_names'" v-model="feed.title" type="text" placeholder="Title" />
          <div v-show="errors.has('title')" class="tag visible -line-danger -large -top -pointing">
            <span>{{ errors.first('title') }}</span>
          </div>
        </fieldset>
        <fieldset v-bind:class="{'-has-tag': errors.has('url'), '-large': true}">
          <label>Title</label>
          <input name="url" v-validate="'required|url|verify_names'" v-model="feed.url" type="url" placeholder="Url..." />
          <div v-show="errors.has('url')" class="tag visible -line-danger -large -top -pointing">
            <span>{{ errors.first('url') }}</span>
          </div>
        </fieldset>
        <button :disabled="errors.any()" class="button -success">Validate</button>
      </form>
    </Modal>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'feedAdd',
    computed: {
      feed() {
        return this.$store.getters.newFeed;
      },
      names() {
        return this.$store.getters.feedNames;
      }
    },
    methods: {
      addFeed: function() {
        let self = this;
        this.$validator.validateAll().then(result => {
          if (result) {
            self.feed.uid = Date.now();
            self.$store.dispatch('addFeed', self.feed);
            self.$store.dispatch('clearFeed');
            self.$refs.addFeedModal.closeModal();
          }
        })
      },
      openAddFeedModal: function() {
        this.$refs.addFeedModal.openModal();
      },
      closeAddBoardModal: function() {
        this.$refs.addFeedModal.closeModal();
      },
    },
    created: function() {
      let self = this;
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
