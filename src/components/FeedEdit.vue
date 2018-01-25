<template>
  <div class="feed-edit">
    <Button class="button -no-border list-head-interaction-button" :click="() => { openAddFeedModal() }">
      <i class="icon -cog"/>
    </Button>
    <Modal ref="editFeedModal" :open="openAddFeedModal">
      <form v-on:submit.prevent="editFeed" class="content">
        <fieldset v-bind:class="{'-has-tag': errors.has('title'), '-large': true}">
          <label>Title</label>
          <input name="title" v-validate.initial="validatorFullName" v-model="newFeed.title" type="text" placeholder="Title" />
          <div v-show="errors.has('title')" class="tag visible -line-danger -large -top -pointing">
            <span>{{ errors.first('title') }}</span>
          </div>
        </fieldset>
        <fieldset v-bind:class="{'-has-tag': errors.has('url'), '-large': true}">
          <label>Title</label>
          <input name="url" v-validate="'required|url|verify_names'" v-model="newFeed.url" type="url" placeholder="Url..." />
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

  function clone(obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
  }

  export default {
    name: 'feedEdit',
    props: ['feed'],
    data: () => {
      return {
        newFeed: {}
      }
    },
    computed: {
      feeds() {
        return this.$store.getters.activeBoard.feeds;
      },
      names() {
        return this.$store.getters.feedNames;
      }
    },
    methods: {
      editFeed: function() {
        let self = this;
        this.$validator.validateAll().then(result => {
          if (result) {
            self.$store.dispatch('editFeed', self.newFeed);
            self.$refs.editFeedModal.closeModal();
          }
        })
      },
      openAddFeedModal: function() {
        this.$refs.editFeedModal.openModal();
      },
      closeAddBoardModal: function() {
        this.$refs.editFeedModal.closeModal();
      },
    },
    created: function() {
      let self = this;
      this.newFeed = clone(this.feed);
      self.validatorFullName = 'required|alpha_num|verify_names_without_original_' + this.feed.title.substr(0);
      self.validatorName = 'verify_names_without_original_' + this.feed.title.substr(0);
      self.$validator.extend(self.validatorName, {
        getMessage: (field) => `The ${field} is already taken.`,
        validate: (value) => new Promise(resolve => {
            resolve({
              valid: value && (value == self.feed.title || ! ~self.names.indexOf(value))
            });
        })
      });
    }
  };
</script>

<style>
  fieldset {
    display: block;
  }
</style>
