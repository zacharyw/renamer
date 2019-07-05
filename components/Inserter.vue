<template>
  <div>
    <b-field>
      <b-radio-button v-model="appendType" native-value="Prepend">
        <span>Prepend</span>
      </b-radio-button>
      <b-radio-button v-model="appendType" native-value="Append">
        <span>Append</span>
      </b-radio-button>
      <b-radio-button v-model="appendType" native-value="Index">
        <span>At Index</span>
      </b-radio-button>
    </b-field>
    <Insert
      ref="Index"
      :originalFiles="originalFiles"
      v-show="isIndex"
    ></Insert>
    <Prepend
      ref="Prepend"
      :originalFiles="originalFiles"
      v-show="isPrepend"
    ></Prepend>
    <Append
      ref="Append"
      :originalFiles="originalFiles"
      v-show="isAppend"
    ></Append>
  </div>
</template>

<script>
import RenamerBase from '~/components/RenamerBase.vue';
import Insert from '~/components/Insert.vue';
import Prepend from '~/components/Prepend.vue';
import Append from '~/components/Append.vue';

export default {
  name: 'Inserter',
  extends: RenamerBase,
  components: {
    Insert,
    Prepend,
    Append
  },
  data() {
    return {
      appendType: 'Append'
    };
  },
  computed: {
    isAppend() {
      return this.appendType === 'Append';
    },
    isPrepend() {
      return this.appendType === 'Prepend';
    },
    isIndex() {
      return this.appendType === 'Index';
    },
    files() {
      return this.$refs[this.appendType].files;
    }
  }
};
</script>
