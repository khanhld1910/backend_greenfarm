<template>
  <span class="pull-right">{{ time }}</span>
</template>
<script>

import { toTime01 } from '../../helpers/app-helper'

export default {
  props: ['value'],
  computed: {
    time: function() {
      return toTime01(this.value)
    }
  },
}
</script>

