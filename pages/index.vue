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
          <b-button type="is-primary">Select Files</b-button>
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
        <b-tabs v-model="activeTab" type="is-boxed">
          <b-tab-item label="Replace">
            <Replacer ref="renamer" :originalFiles="files"></Replacer>
          </b-tab-item>
          <b-tab-item label="Insert">
            <Inserter ref="renamer" :originalFiles="files"></Inserter>
          </b-tab-item>
          <b-tab-item label="Remove">
            <Remover ref="renamer" :originalFiles="files"></Remover>
          </b-tab-item>
        </b-tabs>
        <b-button
          type="is-primary"
          @click="downloadFiles"
          style="margin-left: 1rem;"
        >
          Download Files
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component';
import Replacer from '~/components/Replacer';
import Inserter from '~/components/Inserter';
import Remover from '~/components/Remover';

export default {
  name: 'HomePage',
  components: {
    FileUpload: VueUploadComponent,
    Replacer,
    Inserter,
    Remover
  },
  data() {
    return {
      files: [],
      columns: [
        { field: 'name', label: 'Name' },
        { field: 'type', label: 'Type' },
        { field: 'size', label: 'Size' }
      ],
      rawPatterns: '',
      activeTab: 0
    };
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
      this.$refs.renamer.downloadZip();
    }
  }
};
</script>
