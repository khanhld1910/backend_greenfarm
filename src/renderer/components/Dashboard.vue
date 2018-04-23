<template>
  <div class="wrapper">
  
    <app-header>
    </app-header>

    <app-aside>
    </app-aside>

    <app-content>
    </app-content>

    <app-footer>
    </app-footer>

    <div class="alert-column"> 
      <div 
        v-for="(alert, index) in alerts" 
        v-bind:key="index"
        class="alert alert-dismissible "
        v-bind:id="`alert-${index+1}`"
        v-bind:class="`alert-${alert.type}`">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
          <h4>
            <i class="icon fa fa-ban" v-if="alert.type == 'danger'"></i> 
            <i class="icon fa fa-check" v-if="alert.type == 'success'"></i> 
            <i class="icon fa fa-info" v-if="alert.type == 'info'"></i> 
            <i class="icon fa fa-warning" v-if="alert.type == 'warning'"></i> 
            {{ alert.title }}
          </h4>
          {{ alert.message }}
      </div>
    </div>
  
    <div class="control-sidebar-bg"></div>  
      
  </div>
</template>

<script>
import Header from "./Dashboard/Header";
import Aside from "./Dashboard/Aside";
import Footer from "./Dashboard/Footer";
import Content from "./Dashboard/Content";

export default {
  name: "dashboard",
  mounted: function(){
    this.$store.dispatch('getProducts')

  },
  computed: {
    alerts: function() {
      return this.$store.getters.alerts
    }
  },
  components: {
    "app-header": Header,
    "app-aside": Aside,
    "app-footer": Footer,
    "app-content": Content
  }
}
</script>

<style lang="scss">

.alert-column {
  overflow: auto;
  width: 50vw;
  height: auto;
  top: 60px;
  right: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .alert {
    width: 100%;
    z-index: 999;
  }
}

.content--list,
.content--detail {
  padding: 0;
  height: 100%;
  .box {
    margin: 0px;
    height: 100%;
    .box-header,
    .box-footer {
      height: 41px;
    }
    .box-body {
      height: calc(100% - 41px - 41px);
    }
    &.box-no-header .box-body {
      height: calc(100% - 41px);
    }
  }
}
.content--list {
  padding-right: 10px;
}
.content--detail {
  padding-left: 10px;
}

div[name="Datatable"] {
  height: 100%;
  div[name="SimpleTable"], .-complex-table {
    height: calc(100% - 45px - 44px) !important;
    .-table-header {
      height: 58px;
      margin: 0px;
    }
    .-table-body {
      max-height: calc(100% - 58px) !important;
      margin: 0px;
    }
  }
  th {
    padding: 8px 5px !important;
  }
  .col_right-align {
    text-align: right !important;
  }
  .-table-body {
    overflow-x: hidden;
    border-bottom: 1px solid #f4f4f4;
  }
}

#table-overlay,
#detail-overlay {
  display: none;
}
.vdp-datepicker {
  height: 34px;
  input {
    height: 34px;
    border: 1px solid #ccc !important;
    text-align: right;
    padding-right: 12px;
    width: 100%;
  }
}
.right-align {
  text-align: right;
}
</style>
