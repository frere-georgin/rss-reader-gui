<template>
  <button ref="button" v-on:click="touch($event);" v-bind:class="classButton">

    <div v-bind:style="{ left: x + 'px', top: y + 'px', height: d + 'px', width: d + 'px' }" v-bind:class="classElem"></div>
    <slot></slot>
  </button>
</template>


<script>
  /* eslint-disable */

  import VueResource from 'vue-resource';
  import Vue from 'vue';
  import _ from 'underscore';

  export default {
    name: 'dashboard',
    props: {
      click: {
        type: Function,
        default: () => { console.log("default") }
      }
    },
    data: () => {
      return { isActive: false,
               x: 0,
               y: 0,
               d: 100
             }
    },
    computed: {
      classButton: function () {
        return {
          "button -icon-only -no-gradient touch": true,
        }
      },
      classElem: function () {
        return {
          "touch-elem": true,
          "animate": this.isActive,
        }
      },
    },
    methods: {
      touch: _.debounce(function(e) {

        let self = this;
        let elem, d, x, y;

        this.isActive = true;
        self.x =  e.offsetX - self.d / 2 + 10;
        self.y =  e.offsetY - self.d / 2 + 10;
        self.click();
        window.setTimeout(() => {
          self.isActive = false;
        }, 500);
      })
    },
    mounted: function() {
      if(this.$refs.button.clientWidth && this.$refs.button.clientHeight)
        this.d = Math.max(this.$refs.button.clientWidth, this.$refs.button.clientHeight);
    }

  };

</script>

<style compile="scss">
</style>
