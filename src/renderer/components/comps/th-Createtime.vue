<template>
  <div class="-th-createtime-comp">
    <select class="form-control input-sm" v-model="displayBy">
      <option value="year">NĂM</option>
      <option value="month">THÁNG</option>
      <option value="week">TUẦN</option>
      <option value="day">NGÀY</option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['xprops'],
  data: () => ({
    displayBy: 'day'
  }),
  watch: {
    displayBy (v) {
      this.xprops.eventbus.$emit('CREATE_TIME_FORMAT', v)
    }
  }
}
</script>
<style>
.-th-createtime-comp {
  display: inline-block;
  margin-bottom: -6px;
}
.-th-createtime-comp > select {
  display: inline-block;
  width: 80px;
  height: 26px;
}
</style>
