<template>
  <p class="-td-number-comp">
    {{ number }}
  </p>
</template>

<script>

export default {
  props: ["value"],
  computed: {
    number: function() {
      return this.value
    }    
  }
};
</script>

<style >
.-td-number-comp {
  text-align: right;
  margin: 0px;
}
</style>
