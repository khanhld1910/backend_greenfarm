<template>
  <p class="-td-deliver_period-comp" :style="{ 'background-color': value == true ? '#3F51B5' : '#F44336' }">
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
  margin: 0;
  border-radius: 2px;
  width: 40px;
  font-size: 12px;
  color: #fff;
  text-align: center;
}

</style>
