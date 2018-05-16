<template>
  <div class="-td-name_with_data_attrs-comp">
    {{ value }}
  </div>
</template>

<script>

export default {
  props: ["value", 'row'],
  mounted: function() {
    //console.log(this.row.name, this.row.id)
    $(this.$el).closest('tr').attr( 'data-row-id', this.row.id)
  }
};
</script>

<style>
</style>
