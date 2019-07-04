<template>
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
</template>

<script>
export default {
  name: 'Replacer',
  props: {
    originalFiles: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      rawPatterns: ''
    };
  },
  computed: {
    patterns() {
      return this.rawPatterns.split(/\r?\n/);
    },
    files() {
      const newFiles = [];

      this.originalFiles.forEach(file => {
        let name = file.name;

        this.patterns.forEach(pattern => {
          const [oldPattern, newPattern] = pattern.split(',');

          name = name.replace(oldPattern, newPattern);
        });

        newFiles.push({ name: name, file: file.file });
      });

      return newFiles;
    }
  }
};
</script>
