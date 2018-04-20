<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Khách hàng
        <small>danh sách khách hàng</small>
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
                  Alert selected id(s)
                </button>
                <button class="btn btn-success pull-right" @click="refreshData" style="margin: 0 5px;">
                  <i class="fa fa-refresh"></i>
                  Refresh
                </button>
              </datatable>
            </div>

            <div class="box-footer">              
              <p><code>{{ queryDisplay }}</code></p>
            </div>
            
            <div id="table-overlay" class="overlay">
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
import components from "./comps/"
import { DatatableHelper } from "../helpers/datatable-helper"
import { db } from "../helpers/firebase-helper"

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
          title: "Họ tên",
          field: "name",
          thComp: "FilterTh",
        },
        { 
          title: "Giới tính", 
          field: "isMale",   
          colStyle: {'width': '80px'}
        },
        { 
          title: "Số Đt", 
          field: "phone",    
          tdComp: "Phone",  
          thComp: "FilterTh", 
          colStyle: {width: '120px'}
        },
        { 
          title: "Ngày sinh", 
          field: "birthday",    
          sortable: true, 
          colStyle: {width: '120px'}, 
          thComp: 'CreatetimeTh', 
          tdComp: 'DateOpt'
        },
      ],
      data: [],
      total: 0,
      selection: [],
      query: {},
      xprops: {
        eventbus: new Vue()
      },
      firebaseArray: [],
      queryDisplay: ''
    }
  },
  mounted: function() {
    this.$bindAsArray('firebaseArray', db.ref().child('Users').orderByChild('id'))
  },
  watch: {
    query: {
      handler() {
        this.handleQueryChange()
      },
      deep: true
    },
    firebaseArray: {
      handler() {
        this.handleQueryChange()
      },
      deep: true
    }
  },
  methods: {
    handleQueryChange() {
      $('#table-overlay').show()
      DatatableHelper.fillTable(this.firebaseArray, this.query).then(
        ({ rows, total, queryDisplay }) => {
          this.data = rows.map(row => {
            if (!row.name) row.name = 'UNNAMED'
            if (!row.isMale) {
              row.isMale = 'UNSET'
            } else {
              row.isMale = (row.isMale == true || row.isMale == 'true') ? 'Nam' : 'Nữ'  
            }

            return row
          })
          this.total = total
          this.queryDisplay = queryDisplay          
          setTimeout(() => $('#table-overlay').hide(), 300)          
        }
      )
    },
    alertSelectedUids() {
      alert(this.selection.map(({ id }) => id))
    },
    refreshData() {
      alert('do something!!!')
    }  
  }
}
</script>

<style scoped>
  #table-overlay {
    display: none;
  }
</style>
