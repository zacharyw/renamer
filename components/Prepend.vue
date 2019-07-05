<template>
  <div>
    <b-field
      label="Text"
      message="Enter text to prepend to the beginning of each file name."
    >
      <b-input v-model="text" placeholder="Text to insert"></b-input>
    </b-field>
  </div>
</template>

<script>
import RenamerBase from '~/components/RenamerBase.vue';

export default {
  name: 'Prepend',
  extends: RenamerBase,
  data() {
    return { text: '' };
  },
  computed: {
    files() {
      const newFiles = [];

      this.originalFiles.forEach(file => {
        newFiles.push({ name: this.text + file.name, file: file.file });
      });

      return newFiles;
    }
  }
};
</script>
