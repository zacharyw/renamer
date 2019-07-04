<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-1">
        💫 Renamer
      </h1>
      <hr />
      <div v-show="files.length > 0">
        <b-table :data="files" :columns="columns"></b-table>
        <br />
      </div>
      <p class="content has-centered-text">
        <file-upload
          ref="upload"
          :multiple="true"
          :value="files"
          @input="updateFiles"
        >
          <b-button type="is-primary">Upload Files</b-button>
        </file-upload>
        <b-button
          v-show="files.length > 0"
          type="is-danger"
          @click="clearFiles"
        >
          Clear Files
        </b-button>
      </p>
      <hr />
      <div v-show="files.length > 0">
        <b-field
          label="Conversion Patterns"
          label-position="on-border"
          message="Comma separated list of patterns to be changed in file names."
        >
          <b-input
            v-model="rawPatterns"
            type="textarea"
            placeholder="PM2016,PM2019"
          ></b-input>
        </b-field>
        <b-button type="is-primary" @click="downloadFiles">
          Download Files
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default {
  name: 'HomePage',
  components: {
    FileUpload: VueUploadComponent
  },
  data() {
    return {
      files: [],
      columns: [
        { field: 'name', label: 'Name' },
        { field: 'type', label: 'Type' },
        { field: 'size', label: 'Size' }
      ],
      rawPatterns: ''
    };
  },
  computed: {
    patterns() {
      return this.rawPatterns.split(/\r?\n/);
    }
  },
  methods: {
    updateFiles(files) {
      this.files = files;
    },
    clearFiles() {
      this.files = [];
      this.$refs.upload.clear();
    },
    downloadFiles() {
      const zip = new JSZip();

      this.files.forEach(file => {
        let name = file.name;

        this.patterns.forEach(pattern => {
          const [oldPattern, newPattern] = pattern.split(',');

          name = name.replace(oldPattern, newPattern);
        });

        zip.file(name, file.file);
      });

      zip.generateAsync({ type: 'blob' }).then(function(content) {
        // see FileSaver.js
        saveAs(content, 'renamed_files' + new Date().getTime() + '.zip');
      });
    }
  }
};
</script>
