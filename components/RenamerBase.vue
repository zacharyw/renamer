<template>
  <div></div>
</template>

<script>
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default {
  name: 'RenamerBase',
  props: {
    originalFiles: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    downloadZip() {
      const zip = new JSZip();

      this.files.forEach(file => {
        zip.file(file.name, file.file);
      });

      zip.generateAsync({ type: 'blob' }).then(function(content) {
        // see FileSaver.js
        saveAs(content, 'renamed_files_' + new Date().getTime() + '.zip');
      });
    }
  }
};
</script>

<style scoped></style>
