<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Tin Nhắn
        <small>Danh sách tin nhắn</small>
      </h1>
    </section>
  
    <!-- Main content -->
    <section class="content row">
      <div class="col-xs-8 content--list">
        <div class="box box-solid box-no-header">

            <div class="box-body">              
              <datatable v-bind="$data">
                <button class="btn btn-default" @click="alertSelectedUids" :disabled="!selection.length">
                  <i class="fa fa-commenting-o"></i>
                  Alert selected uid(s)
                </button>
                <button class="btn btn-success pull-right" @click="clearFilters" style="margin: 0 5px;">
                  <i class="fa fa-times"></i>
                  Xoá filters
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
      <div class="col-xs-4 content--detail">        
        <div class="box box-solid box-default box-no-header">                    
          <div class="box-body">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input type="text" class="form-control" placeholder="tên khách hàng" maxlength="50" :value="selectedRow.name" disabled>
            </div>           
            <div class="row m-top-10">
              <div class="col-xs-7">                  
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                  <input type="tel" class="form-control" placeholder="số điện thoại" :value="phoneDisplay(selectedRow.phone)" disabled style="text-align: right">
                </div> 
              </div>
              <div class="col-xs-5">                               
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-transgender"></i></span>
                  <select class="form-control" style="width: 100%;" aria-hidden="true" :value="selectedRow.isMale" disabled >
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                    <option>UNSET</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row m-top-10">
              <div class="col-xs-6">                  
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-birthday-cake"></i></span>
                  <input type="text" class="form-control" placeholder="sinh nhật" :value="birthdayDisplay(selectedRow.birthday)" disabled style="text-align: right">
                </div>  
              </div>
              <div class="col-xs-6">                  
                <div class="input-group">
                  <span class="input-group-addon"><span class="glyphicon glyphicon-piggy-bank"></span></span>
                  <input type="text" class="form-control" placeholder="tích luỹ" :value="savedDisplay(selectedRow.saved)" disabled style="text-align: right">
                </div> 
              </div>
            </div>
            <div class="form-group m-top-10">
              <textarea class="form-control" rows="3" placeholder="địa chỉ giao hàng ..." v-model="selectedRow.address" disabled minlength="20"></textarea>
            </div>
          </div>
          <div class="box-footer" style="padding: 5px 10px;">
          </div>
          
          <div id="detail-overlay" class="overlay">
            <i class="fa fa-spinner fa-spin"></i>
          </div>

        </div>
      </div>  
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import Vue from "vue";
import components from "./comps";
import { DatatableHelper } from "../helpers/datatable-helper";
import { db } from "../helpers/firebase-helper";
import { phoneFormat, toDate, currencyFormat } from "../helpers/app-helper";
import { firebase } from "@firebase/app";

export default {
  components,
  data: function() {
    return {
      tblClass: "vue2-datatable table-bordered",
      tblStyle: "color: #666",
      pageSizeOptions: [10, 15, 20, 100],
      fixHeaderAndSetBodyMaxHeight: 200,
      tblStyle: "table-layout: fixed", // must
      columns: [
        {
          title: "Số Đt",
          field: ".key",
          tdComp: "Phone",
          thComp: "FilterTh",
          colStyle: { width: "120px" }
        },
        {
          title: "Thời gian",
          field: "time",
          sortable: true,
          colStyle: { width: "120px" },
          tdComp: "ChatTime"
        },
        {
          title: "Nội dung",
          field: "content"
        }
      ],
      data: [],
      total: 0,
      selection: [],
      query: {},
      xprops: {
        eventbus: new Vue()
      },
      willBeReversedArray: [],
      firebaseArray: [],
      queryDisplay: "",
      selectedRow: {
        id: "",
        name: "",
        phone: "",
        address: "",
        sentTime: "",
        deliverTime: "",
        morningDeliver: true,
        totalCost: 0
      },
      selectedRowID: null
    };
  },
  mounted: function() {
    this.$bindAsArray("firebaseArray", db.ref("AdminMessageBox"));
    this.setRowEventListeners();
    //Date picker
  },
  computed: {
    reverseArray: function() {
      let arr = this.firebaseArray;
      return arr.reverse();
    }
  },
  watch: {
    query: {
      handler() {
        this.handleQueryChange();
      },
      deep: true
    },
    firebaseArray: {
      handler() {
        this.handleQueryChange();
      },
      deep: true
    },
    selectedRowID: {
      handler(value) {
        if (!value) {
          this.selectedRow = {
            id: "",
            name: "",
            phone: "",
            address: "",
            birthday: "",
            isMale: true,
            saved: 0
          };
          return;
        }
        this.$bindAsObject("selectedRow", db.ref(`Users/${value}`));
        this.showSelectedRow();
      },
      deep: true
    }
  },
  methods: {
    handleQueryChange() {
      $("#table-overlay").show();
      DatatableHelper.fillTable(this.reverseArray, this.query).then(
        ({ rows, total, queryDisplay }) => {
          this.data = [];
          this.$nextTick(() => {
            this.data = rows.map(row => {
              row.content = row.content.substring(0, 80) + "...";
              return row;
            });
            this.total = total;
            this.queryDisplay = queryDisplay;
            setTimeout(() => $("#table-overlay").hide(), 300);
          });
        }
      );
    },
    setRowEventListeners() {
      let vue = this;
      $(".vue2-datatable").on("click", "tr", function() {
        let rowID = $(this).attr("data-row-id");
        vue.selectedRowID = rowID;
      });
    },
    alertSelectedUids() {
      alert(this.selection.map(({ id }) => id));
    },
    showSelectedRow() {
      $("#detail-overlay").show();

      setTimeout(() => {
        $("#detail-overlay").hide();
      }, 500);
    },
    clearFilters() {
      this.query = { limit: 10, offset: 0, sort: "", order: "" };
    },
    phoneDisplay(value) {
      return phoneFormat(value);
    },
    birthdayDisplay(value) {
      return toDate(value);
    },
    savedDisplay(value) {
      return !value ? "0" : currencyFormat(value) + " đ";
    }
  }
};
</script>

<style lang="scss">
.m-top-10 {
  margin-top: 10px !important;
}
.custom-row .col {
  padding: 0 0 0 10px;
  &:last-child {
    padding-right: 15px;
  }
  &:first-child {
    padding-left: 15px;
  }
}
.bill-details {
  width: 100%;
  border: none;
  box-shadow: none;
  clear: both;
  padding: 10px 0px;
  height: calc(100% - 44px - 44px - 80px + 10px);
  margin-bottom: 0px;
  h5 {
    height: 15px;
    text-decoration: underline;
  }
  .details {
    height: calc(100% - 15px - 20px) !important;
    overflow-y: scroll;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-left: none;
    padding: 20px 10px 20px 0;
  }
}

textarea.form-control {
  width: 100% !important;
  height: 80px !important;
}
.form-group {
  margin: 0;
}
</style>
