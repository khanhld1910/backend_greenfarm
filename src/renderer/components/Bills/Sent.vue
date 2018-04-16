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
        <div class="box box-solid box-no-header">

            <div class="box-body">              
              <datatable v-bind="$data">
                <button class="btn btn-default" @click="alertSelectedUids" :disabled="!selection.length">
                  <i class="fa fa-commenting-o"></i>
                  Alert selected uid(s)
                </button>
              </datatable>
            </div>

            <div class="box-footer">              
              <p><code>{{ queryDisplay }}</code></p>
            </div>
            
            <div id="sent-bills-overlay" class="overlay">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
          </div>
      </div>
      <div class="col-xs-5 content--detail">        
        <div class="box box-solid box-default box-no-header">          
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
import Vue from "vue"
import components from "../comps/"
import { DatatableHelper } from "../../helpers/datatable-helper"
import { db } from "../../helpers/firebase-helper"

export default {
  components,
  data: function() {
    return {
      tblClass: "table-bordered",
      tblStyle: "color: #666",
      pageSizeOptions: [10, 15, 20],
      fixHeaderAndSetBodyMaxHeight: 200,
      tblStyle: 'table-layout: fixed', // must
      columns: [
        {
          title: "Khách hàng",
          field: "name",
          thComp: "FilterTh",
        },
        { 
          title: "Số ĐT", 
          field: "phone", 
          tdComp: "Phone", 
          thComp: "FilterTh",
          colStyle: {width: '105px'}
        },
        {
          title: "Ngày tạo",
          field: "sentTime",
          sortable: true,
          visible: false,
          colStyle: {width: '105px'}
        },
        { 
          title: "Ngày giao", 
          field: "deliverTime", 
          sortable: true,      
          tdComp: "CustomDate",          
          colStyle: {width: '90px'}
        },
        { 
          title: "Buổi", 
          field: "morningDeliver" ,        
          tdComp: "DeliverPeriod",
          colStyle: {width: '55px'}
        },
        { 
          title: "Thành tiền", 
          field: "totalCost",           
          tdComp: "Currency", 
          sortable: true,    
          colStyle: {width: '90px'}
        }
      ],
      data: [],
      total: 0,
      selection: [],
      query: {},
      xprops: {
        eventbus: new Vue()
      },
      sentBills: [],
      queryDisplay: ''
    }
  },
  mounted: function() {
    this.$bindAsArray('sentBills', db.ref().child('Bills').orderByChild('status').equalTo(1))
  },
  watch: {
    query: {
      handler() {
        this.handleQueryChange()
      },
      deep: true
    },
    sentBills: {
      handler() {
        this.handleQueryChange()
      },
      deep: true
    }
  },
  methods: {
    handleQueryChange() {
      $('#sent-bills-overlay').show()
      DatatableHelper.fillTable(this.sentBills, this.query).then(
        ({ rows, total, queryDisplay }) => {
          this.data = rows
          this.total = total
          this.queryDisplay = queryDisplay          
          setTimeout(() => $('#sent-bills-overlay').hide(), 300)          
        }
      )
    },
    alertSelectedUids() {
      alert(this.selection.map(({ id }) => id))
    }
  }
}
</script>

<style scoped>
  #sent-bills-overlay {
    display: none;
  }
</style>
