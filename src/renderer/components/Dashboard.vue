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
  
    <div class="control-sidebar-bg"></div>  
      
  </div>
</template>

<script>
  import Header from "./Dashboard/Header"
  import Aside from "./Dashboard/Aside"
  import Footer from "./Dashboard/Footer"
  import Content from "./Dashboard/Content"
  
  export default {
    name: "dashboard",
    components: {
      "app-header": Header,
      "app-aside": Aside,
      "app-footer": Footer,
      "app-content": Content,
    }
  }

</script>

<style lang="scss">

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
  }
}

.content--list {
  padding-right: 10px;  
}
.content--detail {
  padding-left: 10px;
}

</style>
