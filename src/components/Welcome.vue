<template>
  <div class="welcome">
    <Modal ref="welcomeModal" :open="openWelcomeModal" :close="closeWelcomeModal">
      <div class="welcome-content content">
        <img class="welcome-image" src="static/welcome.svg"/>
        <h5 class="welcome-title">Bienvenue !</h5>
        <p class="welcome-text">Rss-feed est une interface qui vous permet d'aggréger tout le contenu du web au même endroit. La meilleure façon de rester à jour sans avoir à cliquer partout.</p>
        <div class="welcome-button-wrapper">
          <Button class="button -primary" :click="() => { closeWelcomeModal() }">
            <span>J'ai compris</span>
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'welcome',
    methods: {
      openWelcomeModal: function() {
        this.$refs.welcomeModal.openModal();
      },
      closeWelcomeModal: function() {
        this.$refs.welcomeModal.closeModal();
      }
    },
    mounted: function() {
      console.log(1);
      this.$refs.welcomeModal.openModal();
    }
  };
</script>

<style lang="scss">
.text-center {
  text-align: center;
  .button {
    margin-right:0;
  }
}
.welcome {
  .card {
    width: 450px;
  }
}
.welcome-title {
  margin: 0;
}
.welcome-text {
  margin-bottom: 20px!important;
}
.welcome-title, .welcome-text, .welcome-button-wrapper {
  text-align: center;
}
.welcome-image {
  width: 250px;
  display: block;
  margin: 0 auto;
}
</style>
