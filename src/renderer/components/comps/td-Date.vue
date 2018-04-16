<template>
  <div class="-td-date-comp">
    {{ date }}
  </div>
</template>

<script>

import { toDate } from '../../helpers/app-helper'

export default {
  props: ["value"],
  computed: {
    date: function() {
      return toDate(this.value)
    }    
  }
};
</script>

<style >
.-td-date-comp {
  text-align: right;
}
</style>
