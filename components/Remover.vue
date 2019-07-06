<template>
  <div>
    <b-field
      label="Index"
      message="The index at which to start removing characters.
    0 would start with the first character, 1 the second, and so forth."
    >
      <b-input ref="index" v-model="index" type="number" required></b-input>
    </b-field>
    <div class="field">
      <b-checkbox v-model="countFromEnd">
        Count index from end of name
      </b-checkbox>
    </div>
    <div class="field" label=""></div>
    <b-field label="Count" message="How many characters to remove.">
      <b-input ref="count" v-model="count" type="number" required></b-input>
    </b-field>
    <b-field>
      <b-radio-button v-model="applyTo" native-value="fileName">
        <span>File Name</span>
      </b-radio-button>
      <b-radio-button v-model="applyTo" native-value="extension">
        <span>Extension</span>
      </b-radio-button>
      <b-radio-button v-model="applyTo" native-value="both">
        <span>Both</span>
      </b-radio-button>
    </b-field>
    <p class="help">
      Which part of the name to remove from. The "." in a file's name is
      considered part of the Extension.
    </p>
  </div>
</template>

<script>
import { getExtensionArray, getFilenameArray } from '../assets/StringUtils';
import RenamerBase from '~/components/RenamerBase.vue';

export default {
  name: 'Remover',
  extends: RenamerBase,
  data() {
    return {
      index: 0,
      countFromEnd: false,
      count: 0,
      applyTo: 'fileName'
    };
  },
  computed: {
    files() {
      const newFiles = [];

      this.originalFiles.forEach(file => {
        let nameArray = [...file.name];
        let startIndex = this.index;
        let prefix = [];
        let suffix = [];

        if (this.applyTo === 'fileName') {
          nameArray = getFilenameArray(file.name);
          suffix = getExtensionArray(file.name);
        } else if (this.applyTo === 'extension') {
          prefix = getFilenameArray(file.name);
          nameArray = getExtensionArray(file.name);
        }

        if (this.countFromEnd) {
          startIndex = nameArray.length - this.index - 1;
        }

        nameArray.splice(startIndex, this.count);

        const newName = prefix
          .concat(nameArray)
          .concat(suffix)
          .join('');

        newFiles.push({ name: newName, file: file.file });
      });

      return newFiles;
    }
  }
};
</script>

<style scoped></style>
