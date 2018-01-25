<template>
  <div v-bind:class="{'modal': true, '-closing': isClosing, '-opening': isOpening, '-open': isOpen}">
    <div v-on:click="closeModal" class="overlay close-modal"></div>
    <div class="content">
      <div class="card content-wrapper">
        <div v-on:click="closeModal" class="close-button close-modal">
          <i class="icon -cross"></i>
        </div>
        <slot>
          This will only be displayed if there is no content
          to be distributed.
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'modal',
    props: ['open', 'close'],
    data: () => {
      return {
        isOpening: false,
        isClosing: false,
        isOpen: false,
      }
    },
    methods: {
      openModal: function() {
        let self = this;
        self.isOpening = true;
        window.setTimeout(function() {
          self.isOpen = true;
          self.isOpening = false;
        }, 600);
      },
      closeModal: function() {
        let self = this;
        self.isClosing = true;
        window.setTimeout(function() {
          self.isOpen = false;
          self.isClosing = false;
        }, 600);
      }
    },
    // ready: function () {
    //   document.addEventListener("keydown", (e) => {
    //     console.log(e.keyCode);
    //     if (this.isOpen && e.keyCode == 27) {
    //       this.close();
    //     }
    //   });
    // }
  };
</script>

<style>

.modal>.content {
  min-width: 600px;
}

</style>
