<template>
  <div v-bind:class="{ 'column-wrapper': true, 'column-wrapper--double': feed.isDouble}">
    <div class="column">
      <div class="list-head">
        <TitleEdit type="feed" :ref="feed" :validate="(newValue) => { editFeed(feed, newValue) }" :original="feed.title" :value="feed.title">
          <h5 class="list-head-title">
            {{ feed.title }}
          </h5>
        </TitleEdit>
        <div class="list-head-interaction">
          <Button class="button -no-border list-head-interaction-button" :click="() => { deleteFeed(feed) }">
            <i class="icon -cross"/>
          </Button>
          <FeedEdit :feed="feed"/>
        </div>
     </div>
       <svg class="bg" width="250" height="1">
         <path :d="headerPath" fill="rgba(0,0,0,0.05)"></path>
       </svg>
       <!-- :style="contentPosition" -->
        <ul v-if="content && content.length > 0" :style="contentPosition" @mousedown="startDrag" @touchstart="startDrag"
       @mousemove="onDrag" @touchmove="onDrag"
       @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag" class="list" v-bind:class="{ loading: isLoading, error: isError }">
         <Item v-if="!isError" v-for="item in content" :key="item" :isAuthor="feed.isAuthor" :isDesc="feed.isDesc" :isImage="feed.isImage" :item="item" />

         <li v-if="isError" class="item item--error -headless">
           <h3 class="item--error-title">Error</h3>
         </li>
          <!-- <VuePerfectScrollbar class="list scroll-area" v-once :feed="feed" :settings="settings">
           <Item v-if="!isError" v-for="item in content" :key="item" :isAuthor="feed.isAuthor" :isDesc="feed.isDesc" :isImage="feed.isImage" :item="item" />
           <li v-if="isError" class="item item--error -headless">
             <h3 class="item--error-title">Error</h3>
           </li>
          </VuePerfectScrollbar> -->
       </ul>
       <div v-if="content && content.length == 0">
         Pas d'article
       </div>
    </div>
    <Modal ref="modal" :open="openModal">
      <FeedAdd ref="feedForm" reqType="put" :boards="boards" :feed="feed" :close="closeModal"/>
    </Modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import VueResource from 'vue-resource';
  import Vue from 'vue';
  import dynamics from 'dynamics.js';
  import feedProvider from '../api/feedProvider.js';
  import boardsProvider from '../api/boardsProvider.js';
  import jsonToParams from '../helpers/jsonToParams.js';

  const width = 250;
  const height = 1;

  export default {
    name: 'list',
    props: ['feed'],
    data: () => {
      return {
        content: null,
        isLoading: true,
        isError: false,
        dragging: false,
        // quadratic bezier control point
        c: { x: height, y: height },
        // record drag start point
        start: { x: 0, y: 0 },
        settings: {
          maxScrollbarLength: 60
        }
      }
    },
    filters: {
     limit: function(arr, limit) {
       return arr.slice(0, Number(limit))
     }
    },
    computed: {
      boards() {
        return this.$store.getters.boards
      },
      headerPath: function () {
        return 'M0,0 L' + width + ',0 ' + width + ','+ height +
          'Q' + this.c.x + ',' + this.c.y +
          ' 0,'+ height
      },
      contentPosition: function () {
        var dy = this.c.y - height
        var dampen = dy > 0 ? 2 : 4
        return {
          transform: 'translate3d(0,' + dy / dampen + 'px,0)'
        }
      }
    },
    sockets: {
      listIsUpdated: function(val) {
        console.log(val.feedName, val.board, this.feed, this.feed.board, this.feed.title, this.content && this.content.length > 0 && this.feed && val.feedName == this.feed.title && val.board == this.feed.board);
        if (this.content && this.content.length > 0 && this.feed && val.feedName == this.feed.title && val.board == this.feed.board) {
          val.isNew = true;
          this.content.unshift(val);
          //this.update();
          console.log(this.content.length);
          if(this.content.length > 10) {
            this.content.pop();
          }
        }
      }
    },
    methods: {
      editFeed: function(feed, newValue) {
        console.log("edit", feed);
        feed.title = newValue;
        this.update();
        this.$store.dispatch('editFeed', feed);
      },
      startDrag: function (e) {
        e = e.changedTouches ? e.changedTouches[0] : e
        this.dragging = true
        this.start.x = e.pageX
        this.start.y = e.pageY
      },
      onDrag: function (e) {
        e = e.changedTouches ? e.changedTouches[0] : e
        if (this.dragging) {
          this.c.x = height + (e.pageX - this.start.x)
          // dampen vertical drag by a factor
          var dy = e.pageY - this.start.y
          var dampen = dy > 0 ? 1.5 : 4
          this.c.y = height + dy / dampen
        }
      },
      stopDrag: function () {
        let self = this;
        if (this.dragging) {
          this.dragging = false;
          window.setTimeout(function(){
            self.update();
          }, 500);
          dynamics.animate(this.c, {
            x: height,
            y: height
          }, {
            type: dynamics.spring,
            duration: 700,
            friction: 280
          })
        }
      },
      pause: function() {
      },
      deleteFeed: function(feed) {
        let self = this;
        self.$store.dispatch('removeFeed', feed);
      },
      openModal: function() {
        this.$refs.modal.openModal();
      },
      closeModal: function() {
        this.$refs.modal.closeModal();
      },
      update: function() {
        let self = this;
        self.isLoading = true;
        self.isError = false;

        let param = jsonToParams({
          type: self.feed.type,
          url: self.feed.url
        });

        feedProvider.getFeed(param, function(data) {
          //console.log(data);
          if(data != "error") {
            self.content = data;
            self.isLoading = false;
          }
          else {
            self.isLoading = false;
            self.isError = true;
          }
        });
      }
    },
    created: function() {
      let self = this;
      console.log("list-created");
      self.update();
    }
  };
</script>

<style lang="scss">

</style>
