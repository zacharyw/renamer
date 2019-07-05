<template>
  <div>
    <b-field
      label="Index"
      message="The index at which to
        insert text. 0 would insert it at the beginning (the same as prepend), 1
        would insert it after the first character, and so forth."
    >
      <b-input
        v-model="index"
        type="number"
        placeholder="Index to insert text at"
      ></b-input>
    </b-field>
    <div class="field">
      <b-checkbox v-model="countFromEnd">
        Count index from end of string
      </b-checkbox>
    </div>
    <b-field
      label="Text"
      message="Enter text to insert into each file name at given index."
    >
      <b-input v-model="text" placeholder="Text to insert"></b-input>
    </b-field>
  </div>
</template>

<script>
import { reverseString, insertAtIndex } from '../assets/StringUtils';
import RenamerBase from '~/components/RenamerBase.vue';

export default {
  name: 'Insert',
  extends: RenamerBase,
  data() {
    return {
      text: '',
      index: 0,
      countFromEnd: false
    };
  },
  computed: {
    files() {
      const newFiles = [];

      this.originalFiles.forEach(file => {
        let newName = null;

        if (this.countFromEnd) {
          newName = reverseString(
            insertAtIndex(
              reverseString(file.name),
              reverseString(this.text),
              this.index
            )
          );
        } else {
          newName = insertAtIndex(file.name, this.text, this.index);
        }

        newFiles.push({
          name: newName,
          file: file.file
        });
      });

      return newFiles;
    }
  }
};
</script>
