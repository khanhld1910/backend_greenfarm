<template>
  <router-view>
  </router-view>
</template>

<script>
export default {
  created: function() {
    $("body").attr(
      "class",
      "sidebar-mini lte-fixed skin-purple sidebar-collapse"
    );
  }
};
</script>

<style scoped>

</style>
