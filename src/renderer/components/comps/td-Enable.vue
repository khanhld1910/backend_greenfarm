<template>
  <div class="-td-enable-comp" :style="{ 'background-color': value ? '#4CAF50' : '#FF5722' }">
    {{ enable }}
  </div>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    enable: function() {
      return this.value ? 'Có' : 'Không'
    }
  }
}
</script>
<style>
.-td-enable-comp {
  border-radius: 2px;
  width: 40px;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
</style>
