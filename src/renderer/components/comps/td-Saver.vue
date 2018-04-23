<template>
  <small class="-td-saver-comp label pull-right" :style="{ 'background-color': color }">
    {{ saver }} 
    <span v-if="value != ''">đ</span>
  </small>
</template>

<script>

import { currencyFormat } from '../../helpers/app-helper'

export default {
  props: ["value"],
  computed: {
    saver: function() {      
      return !this.value ? '0' : currencyFormat(this.value)
    },
    color: function() {
      let value = this.value
      if (value == 0 || !value) return '#D32F2F'
      if (value < 20000) return '#303F9F'
      if (value < 50000) return '#388E3C'
      return '#F57C00'
    }    
  }
};
</script>

<style>
.-td-saver-comp {
  text-align: center;
  color: #fff;
  font-size: 12px;
}
</style>
