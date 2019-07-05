<template>
  <div></div>
</template>

<script>
export default {
  name: 'RenamerBase',
  props: {
    originalFiles: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style scoped></style>
