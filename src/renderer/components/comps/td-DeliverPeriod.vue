<template>
  <p class="-td-deliver_period-comp">
    {{ period }}
  </p>
</template>

<script>

export default {
  props: ["value"],
  computed: {
    period: function() {
      return (this.value == true) ? 'Sáng' : 'Chiều'
    }    
  }
};
</script>

<style >
.-td-deliver_period-comp {
  text-align: right;
}
</style>
