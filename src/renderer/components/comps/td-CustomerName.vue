<template>
  <div class="-td-name_with_data_attrs-comp">
    {{ value }}
  </div>
</template>

<script>

export default {
  props: ["value", 'row'],
  mounted: function() {
    $(this.$el).closest('tr').attr( 'data-row-id', this.row.phone)
  }
};
</script>

<style>
</style>
