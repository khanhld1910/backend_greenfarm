<template>
  <p>{{ t }}</p>
</template>
<script>
import moment from "moment";

export default {
  props: ["value", "xprops"],
  data: () => ({
    displayBy: "day"
  }),
  created() {
    this.xprops.eventbus.$on("CREATE_TIME_FORMAT", displayBy => {
      this.displayBy = displayBy;
    });
  },
  computed: {
    t() {
      const t = moment(this.value).locale("vi");

      switch (this.displayBy) {
        case "year":
          return t.format("YYYY");
        case "month":
          return t.format("MMMM, YYYY");
        case "week":
          return t.format("#W, YYYY");
        case "day":
        default:
          return t.format("DD/MM/YYYY");
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
  text-align: right;
}
</style>
