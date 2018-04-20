<template>
  <p class="-td-rating-comp">
    {{ rating }}
    <i class="fa fa-star text-success"></i>
  </p>
</template>

<script>

export default {
  props: ["value"],
  computed: {
    rating: function() {
      return this.value.toFixed(1)
    }    
  }
};
</script>

<style >
.-td-rating-comp {
  text-align: right;
  margin: 0px;
}
</style>
