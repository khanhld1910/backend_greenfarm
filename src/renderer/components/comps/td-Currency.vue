<template>
  <div class="-td-currency-comp">
    {{ currency }} đ
  </div>
</template>

<script>

import { currencyFormat } from '../../helpers/app-helper'

export default {
  props: ["value"],
  computed: {
    currency: function() {
      return currencyFormat(this.value)
    }
    
  }
};
</script>

<style>
.-td-currency-comp {
  text-align: right;
}
</style>
