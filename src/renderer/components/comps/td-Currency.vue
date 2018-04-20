<template>
  <div class="-td-currency-comp">
    {{ currency }} 
    <span v-if="value != ''">đ</span>
  </div>
</template>

<script>

import { currencyFormat } from '../../helpers/app-helper'

export default {
  props: ["value"],
  computed: {
    currency: function() {      
      return this.value == '' ? 'không' : currencyFormat(this.value)
    }    
  }
};
</script>

<style>
.-td-currency-comp {
  text-align: right;
}
</style>
