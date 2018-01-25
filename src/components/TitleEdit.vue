<template>
  <form v-on:submit.prevent="($event) => { update($event) }" class="edit-value" v-bind:class="{ editing: isEditing }">
    <span v-show="!isEditing" v-on:click="doubleClick"  >
      <slot ></slot>
    </span>
    <div v-show="isEditing" class="merge -horizontal">
      <fieldset>
        <input @keyup.enter="($event) => { update($event) }" @focus="onFocus" @blur="onBlur" ref="formulaire" name="value" v-validate.initial="validatorFullName" v-model="newValue" type="text" placeholder="Text">
        <div v-show="errors.has('value')" class="tag visible -large -top -pointing">
          <span>{{ errors.first('value') }}</span>
        </div>
      </fieldset>
      <button :disabled="errors.any()" @click="($event) => { update($event) }" class="button -primary -icon-only -no-gradient">
        <i class="icon -check"></i>
      </button>
    </div>
  </form>
</template>

<script>
  /* eslint-disable */
  import VueResource from 'vue-resource';
  import Vue from 'vue';

  export default {
    name: 'titleEdit',
    directives: { focus: focus },
    props: {
      type: {
        type: String,
        default: "board"
      },
      value: {
        type: String,
        default: "value"
      },
      original: {
        type: String,
        default: "value"
      },
      edit: {
        type: Function,
        default: () => { console.log("EditValueDefaultValidateFunction") }
      },
      validate: {
        type: Function,
        default: () => { console.log("EditValueDefaultValidateFunction") }
      }
    },
    data: () => {
      return {
        isEditing: false,
        newValue: "",
        validatorName: "",
        focused: false,
        delay: 200,
        clicks: 0,
        timer: null
      }
    },
    watch: {
      focused: function (val) {
        let self = this;
        if (val == true) {
          Vue.nextTick(function() {
            self.$refs.formulaire.focus();
          });
        }
      }
    },
    computed: {
        names() {
          console.log(this.type);
          if(this.type == "board")
            return this.$store.getters.boardNames;
          if(this.type == "feed")
            return this.$store.getters.feedNames;
        }
    },
    methods: {
      doubleClick: function(event){
        let self = this;
        this.clicks++;
        if(this.clicks === 1) {
          this.timer = setTimeout(function() {
            self.clicks = 0;
          }, this.delay);
        } else {
           clearTimeout(this.timer);
           self.editMode();
           this.clicks = 0;
        }
      },
      onBlur: function() {
        let self = this;
        window.setTimeout(() => {
          self.focused = false;
          self.isEditing = false;
        }, 100);
      },
      onFocus: function() {
        this.editMode();
      },
      editMode: function() {
        this.isEditing = true;
        this.focused = true;
      },
      update: function(e) {
        console.log("update");
        e.preventDefault();
        this.isEditing = false;
        if(this.$validator.validateAll())
          this.validate(this.newValue);
      }
    },
    created: function() {
      let self = this;
      self.newValue = this.value;
      self.validatorFullName = 'required|alpha_num|verify_names_without_original_' + this.value.substr(0);
      self.validatorName = 'verify_names_without_original_' + this.value.substr(0);
      self.$validator.extend(self.validatorName, {
        getMessage: (field) => `The ${field} is already taken.`,
        validate: (value) => new Promise(resolve => {
            resolve({
              valid: value && (value == self.original || ! ~self.names.indexOf(value))
            });
        })
      });
    },

  };

</script>

<style compile="scss">

</style>
