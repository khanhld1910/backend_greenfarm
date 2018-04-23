<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Hóa Đơn Đã Hoàn Thành
        <small>Danh sách hóa đơn đã giao hàng</small>
      </h1>
    </section>
  
    <!-- Main content -->
    <section class="content row">
      <div class="col-xs-6 content--list">
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
      <div class="col-xs-6 content--detail">        
        <div class="box box-solid box-default box-no-header">                    
          <div class="box-body">            
              <div class="row">
                <div class="col-xs-7">                 
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="text" class="form-control" placeholder="tên khách hàng" maxlength="50" :value="selectedRow.name" disabled>
                  </div>
                </div>
                <div class="col-xs-5">                  
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                    <input type="tel" class="form-control" placeholder="số điện thoại" :value="selectedRow.phone" disabled style="text-align: right">
                  </div> 
                </div>
              </div>
              <div class="row m-top-10 custom-row">
                <div class="col-xs-4 col">                  
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input type="text" class="form-control"  placeholder="ngày tạo đơn" disabled :value="sentTimeFormat">                    
                  </div> 
                </div>
                <div class="col-xs-4 col">                                  
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-truck"></i></span>
                    <datepicker monday-first format="dd/MM/yyyy" language="vi" :value="selectedRow.deliverTime" placeholder="ngày giao hàng" disabled-picker ></datepicker>  
                  </div>
                </div>
                <div class="col-xs-4 col">                                   
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
                    <select class="form-control" style="width: 100%;" aria-hidden="true" :value="selectedRow.morningDeliver" disabled >
                      <option value="true">Sáng</option>
                      <option value="false">Chiều</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group m-top-10">
                <textarea class="form-control" rows="3" placeholder="địa chỉ giao hàng ..." :value="selectedRow.address" disabled minlength="20"></textarea>
              </div>
              <!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->
              <div class="bill-details">
                <h5 class="text-success">
                  Chi tiết đơn hàng
                </h5>
                <div class="details table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>D/mục</th>
                        <th class="right-align">Đ/giá</th>
                        <th class="right-align">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(bill, index) in singleBills" v-bind:key="bill.id">
                        <td>{{index+1}}</td>
                        <td>
                          {{bill.productName}}
                          <span class="label label-primary">
                            {{bill.quantity}}
                          </span>

                        </td>
                        <td class="right-align">{{moneyFormat(bill.unitPrice)}} đ</td>
                        <td class="right-align">{{moneyFormat(singleBillCost(index))}} đ</td>
                      </tr>
                      <tr v-if="selectedRowID">
                        <td>0</td>
                        <td>
                          Phí giao hàng
                        </td>
                        <td class="right-align"></td>
                        <td class="right-align">{{moneyFormat(selectedRow.ship)}} đ</td>
                      </tr>
                      <tr v-if="selectedRowID">
                        <td>-1</td>
                        <td>
                          Dùng điểm
                        </td>
                        <td class="right-align"></td>
                        <td class="right-align" style="color: rgb(244, 67, 54);">-{{moneyFormat(selectedRow.saved)}} đ</td>
                      </tr>
                      <tr v-if="selectedRowID">
                        <td>&Sigma;</td>
                        <th>
                          Tổng cộng
                        </th>
                        <td class="right-align"></td>
                        <th class="right-align text-danger">{{moneyFormat(calcBillTotalCost - selectedRow.saved + selectedRow.ship)}}</th>
                      </tr>
                    </tbody>
                  </table>            
                </div>                
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
import components from "../comps/";
import { DatatableHelper } from "../../helpers/datatable-helper";
import { toTime, currencyFormat } from "../../helpers/app-helper";
import { db } from "../../helpers/firebase-helper";
import Datepicker from "vuejs-datepicker";

components["Datepicker"] = Datepicker;

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
          title: "Khách hàng",
          field: "name",
          tdComp: "NameWithDataAttrs",
          thComp: "FilterTh"
        },
        {
          title: "Số ĐT",
          field: "phone",
          tdComp: "Phone",
          thComp: "FilterTh",
          colStyle: { width: "105px" }
        },
        {
          title: "Ngày tạo",
          field: "sentTime",
          sortable: true,
          visible: false,
          colStyle: { width: "105px" }
        },
        {
          title: "Ngày giao",
          field: "deliverTime",
          sortable: true,
          tdComp: "CustomDate",
          colStyle: { width: "90px" }
        },
        {
          title: "Buổi",
          field: "morningDeliver",
          tdComp: "DeliverPeriod",
          colStyle: { width: "55px" }
        },
        {
          title: "Thành tiền",
          field: "totalCost",
          tdComp: "Currency",
          sortable: true,
          colStyle: { width: "90px" }
        }
      ],
      data: [],
      total: 0,
      selection: [],
      query: {},
      xprops: {
        eventbus: new Vue()
      },
      firebaseArray: [],
      queryDisplay: "",
      selectedRow: {
        id: null,
        name: "",
        phone: "",
        address: "",
        sentTime: "",
        deliverTime: "",
        morningDeliver: true,
        cost: 0,
        ship: 0,
        saved: 0,
        totalCost: 0
      },
      selectedRowID: null,
      singleBills: []
    };
  },
  mounted: function() {
    this.$bindAsArray(
      "firebaseArray",
      db
        .ref()
        .child("Bills")
        .orderByChild("status")
        .equalTo(3)
    );
    this.setRowEventListeners();
    //Date picker
  },
  computed: {
    sentTimeFormat: function() {
      return toTime(this.selectedRow.sentTime);
    },
    calcBillTotalCost: function() {
      //if (!this.selectedRowID || !this.selectedRow.id) return
      let sum = 0;
      for (let i = 0; i < this.singleBills.length; i++) {
        let bill = this.singleBills[i];

        let unitCost = bill.salePrice ? bill.salePrice : bill.unitPrice;

        sum += unitCost * bill.quantity;
      }
      //return sum > 50000 ? sum : sum + 5000 // 5000 phi giao hang
      return sum;
    },
    shipCost: function() {
      return this.calcBillTotalCost >= 50000 ? 0 : 5000;
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
            id: null,
            name: "",
            phone: "",
            address: "",
            sentTime: "",
            deliverTime: "",
            morningDeliver: true,
            totalCost: 0
          };
          this.singleBills = [];
          this.singleBillsBackup = [];
          return;
        }
        this.$bindAsObject("selectedRow", db.ref().child(`Bills/${value}`));
        this.$bindAsArray(
          "singleBills",
          db
            .ref()
            .child(`Invoices/sent/`)
            .orderByChild("totalBillID")
            .equalTo(value)
        );
        this.showSelectedBill();
      },
      deep: true
    }
  },
  methods: {
    handleQueryChange() {
      $("#table-overlay").show();
      DatatableHelper.fillTable(this.firebaseArray, this.query).then(
        ({ rows, total, queryDisplay }) => {
          this.data = [];
          this.$nextTick(() => {
            this.data = rows.map(row => {
              row.totalCost = row.cost + row.ship - row.saved;
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
        if (vue.addMode) return;
        let rowID = $(this).attr("data-row-id");
        vue.selectedRowID = rowID;
      });
    },
    alertSelectedUids() {
      alert(this.selection.map(({ id }) => id));
    },
    showSelectedBill() {
      $("#detail-overlay").show();

      setTimeout(() => {
        $("#detail-overlay").hide();
      }, 500);
    },
    clearFilters() {
      this.query = { limit: 10, offset: 0, sort: "", order: "" };
    },
    moneyFormat(value) {
      if (!value) return "0";
      return currencyFormat(value);
    },
    singleBillCost(billIndex) {
      let bill = this.singleBills[billIndex];
      if (!bill) return "undefined or null";
      return bill.salePrice
        ? bill.salePrice * bill.quantity
        : bill.unitPrice * bill.quantity;
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
