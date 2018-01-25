<template>
  <transition name="fade">
    <li v-bind:class="{ fresh: item.isFreshContent, new: item.isNew, 'item -headless': true }">
       <a v-on:click="openItem" target="_blank" class="content">
          <div class="item__head">
            <a class="item__head__title title">
              {{ item.title }}
            </a>
          </div>
          <div class="item__meta">
            <label class="item__meta__date">{{ item.date }}</label>
            <label v-if="isAuthor" class="creator"> / {{ item.creator }}</label>
          </div>
          <div class="item__content">
            <img class="item__content__image" v-if="isImage" v-bind:src="item.image"/>
            <label class="item__content__text" v-if="isDesc" v-html="item.content"></label>
          </div>
       </a>
    </li>
  </transition>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'item',
    props: ['item', 'isAuthor', 'isImage', 'isDesc'],
    methods: {
      openItem: function() {
        window.open(this.item.link, '_blank');
      }
    }
  };
</script>

<style lang="scss">

</style>
