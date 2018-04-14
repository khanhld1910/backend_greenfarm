<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Hóa Đơn
        <small>Danh sách hóa đơn chờ duyệt</small>
      </h1>
    </section>
  
    <!-- Main content -->
    <section class="content row">
      <div class="col-xs-7 content--list">
        <div class="box box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">Danh sách đặt hàng</h3>
            </div>
            
            <div class="box-body">
              <p><code>query: {{ query }}</code></p>
              <datatable v-bind="$data" />
            </div>

            <div class="box-footer">
              The footer of the box
            </div>
          </div>
      </div>
      <div class="col-xs-5 content--detail">        
        <div class="box box-solid box-default">
          <div class="box-header with-border">
            <h3 class="box-title">Progress Bars Different Sizes</h3>
          </div>
          
          <div class="box-body">
          </div>

          <div class="box-footer">
            The footer of the box
          </div>
        </div>
      </div>  
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
var columns = [
  {
    data: null,
    width: "5%",
    title: "STT",
    className: "dt-center",
    orderable: true,
    selectRow: true,
    visible: true,
    render: function(data, type, full, meta) {
      return meta.row + 1;
    }
  },
  {
    data: "name",
    width: "35%",
    title: "Khách hàng",
    orderable: true,
    visible: true,
    searchable: true
  },
  {
    data: "phone",
    width: "25%",
    title: "Điện thoại",
    orderable: true,
    visible: true,
    className: "dt-right",
    render: function(phone) {
      return vueInstance.$AppHelper.phoneFormat(phone);
    }
  },
  {
    data: "deliverTime",
    width: "20%",
    title: "Ngày giao",
    orderable: true,
    visible: true,
    render: function(datetime) {
      return vueInstance.$AppHelper.convertFromFirebaseValue(datetime);
    },
    className: "dt-right"
  },
  {
    data: "morningDeliver",
    width: "10%",
    title: "Buổi",
    orderable: true,
    visible: true,
    render: function(morningDeliver) {
      return morningDeliver == true || morningDeliver == "true"
        ? "Sáng"
        : "Chiều";
    },
    className: "dt-right"
  },
  {
    data: null,
    width: "5%",
    className: "dt-center"
  }
];

export default {
  data: function() {
    return {
      columns: [
        { title: "Khách hàng", field: "name"},
        { title: "Số ĐT", field: "phone" },
        { title: "Ngày tạo", field: "sentTime", sortable: true},
        { title: "Ngày giao", field: "deliverTime", sortable: true },
        { title: "Buổi", field: "morningDeliver"},
        { title: "Thành tiền", field: "totalCost", sortable: true},
      ],
      data: [],
      total: 0,
      query: {}
    };
  },
  mounted: function() {
    this.$store.dispatch('getBillList').then(bills => {
      this.data = bills
    })
  },
  methods: {},
  watch: {
    query: {
      handler(query) {
        this.total = this.data.length        
      },
      deep: true
    }
  }
};
</script>

<style scoped>

</style>
