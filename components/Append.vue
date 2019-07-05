<template>
  <div>
    <b-field
      label="Text"
      message="Enter text to append to the end of each file name."
    >
      <b-input v-model="text" placeholder="Text to insert"></b-input>
    </b-field>
    <div class="block">
      <b-radio
        ref="fileNameRadio"
        v-model="appendLocation"
        native-value="fileName"
      >
        <span>File Name</span>
      </b-radio>
      <b-radio
        ref="extensionRadio"
        v-model="appendLocation"
        native-value="extension"
      >
        <span>Extension</span>
      </b-radio>
      <p class="help">
        Append the text to the base filename, or after the extension
      </p>
    </div>
  </div>
</template>

<script>
import { insertAtIndex } from '../assets/StringUtils';
import RenamerBase from '~/components/RenamerBase.vue';

export default {
  name: 'Append',
  extends: RenamerBase,
  data() {
    return {
      appendLocation: 'fileName',
      text: '',
      index: null
    };
  },
  computed: {
    files() {
      const newFiles = [];

      this.originalFiles.forEach(file => {
        if (this.appendLocation === 'fileName') {
          const extensionIndex = file.name.lastIndexOf('.');
          newFiles.push({
            name: insertAtIndex(file.name, this.text, extensionIndex),
            file: file.file
          });
        } else {
          newFiles.push({ name: file.name + this.text, file: file.file });
        }
      });

      return newFiles;
    }
  }
};
</script>
