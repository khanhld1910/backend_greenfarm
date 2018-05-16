<template>
  <router-view>
  </router-view>
</template>

<script>
import * as $ from "jquery";
export default {
};
</script>

<style lang="scss">

@font-face {
    font-family: 'Baomoi_Regular';
    src: url(assets/fonts/baomoi-regular.woff2) format('woff2');
}

@font-face {
    font-family: 'Baomoi_Light';
    src: url(assets/fonts/baomoi-light.woff2) format('woff2');
}

@font-face {
    font-family: 'Baomoi_Italic';
    src: url(assets/fonts/baomoi-italic.woff2) format('woff2');
}

body, .wrapper {
  height: 100vh !important;
  font-family: 'BaoMoi_Regular';
}

body.lte-fixed {
  header.main-header {
    position: fixed;
    width: 100vw;
  }
}

.content-header {
  height: 41px !important;
}

@media (min-width: 768px) {
  .content-wrapper {
    margin-top: 50px;
    min-height: calc(100vh - 50px - 51px) !important;    
    .content {
      height: calc(100vh - 50px - 51px - 41px) !important;  
    }
  }
}

@media (max-width: 767px) {
  .content-wrapper {
    margin-top: 100px;
    min-height: calc(100vh - 100px - 51px) !important;    
    .content {
      height: calc(100vh - 100px - 51px - 41px) !important;  
    }  
  }
}

button {
  outline: none !important;
}
:not(input):not(textarea) {
  user-select: none;
}
:not(input):not(textarea) {
  cursor: default;
}
a:hover,
a > *:hover,
button:hover,
button > *:hover {
  cursor: pointer;
}
* {
  -webkit-user-drag: none;
}


table {
  tr:hover {
    cursor: pointer;
  }
  .dt-right {
    text-align: right !important;
  }
  .dt-left {
    text-align: left !important;
  }
  .dt-center {
    text-align: center !important;
  }
  .dt-justify {
    text-align: justify !important;
  }
}

table.table-small {
  font-size: 1.2rem;
}

.content__box-left,
.content__box-right {
  padding: 10px 5px;
  font-size: 1.2rem;
}
.content__box-right {
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.content--title {
  margin-top: 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

</style>
