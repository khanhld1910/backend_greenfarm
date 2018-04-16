<template>
  <div class="-td-phone-comp">
    {{ phone }}
  </div>
</template>

<script>

import { phoneFormat } from '../../helpers/app-helper'

export default {
  props: ["value"],
  computed: {
    phone: function() {
      return phoneFormat(this.value)
    }
    
  }
};
</script>

<style>
.-td-phone-comp {
  text-align: left;
}
</style>
