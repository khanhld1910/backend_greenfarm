<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" style="height: auto;">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="~@/assets/users/ldk.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Administrator</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu tree" data-widget="tree">
        <li class="header">QUẢN LÝ</li>
         <router-link to="/bills" tag="li" class="treeview" active-class="active">  
          <a href="#">
            <i class="fa fa-tasks"></i> <span>Hóa đơn</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">                  
            <router-link to="/bills/sent" tag="li" active-class="active" exact>  
              <a href="bills-sent">
                <i class="fa fa-circle-o"></i>
                <span>Chờ duyệt</span>
              </a>
            </router-link>                 
            <router-link to="/bills/checked" tag="li" active-class="active" exact>  
              <a href="#">
                <i class="fa fa-circle-o"></i>
                <span>Đang giao</span>
              </a>
            </router-link>              
            <router-link to="/bills/done" tag="li" active-class="active" exact>  
              <a href="#">
                <i class="fa fa-circle-o"></i>
                <span>Hoàn thành</span>
              </a>
            </router-link>
          </ul>
        </router-link>        
        <router-link to="/products" tag="li" active-class="active">  
          <a href="#">
            <i class="fa fa-leaf"></i>
            <span>Sản Phẩm</span>
          </a>
        </router-link>
        <router-link to="/customers" tag="li" active-class="active">  
          <a href="#">
            <i class="fa fa-users"></i>
            <span>Khách Hàng</span>
          </a>
        </router-link>
        <router-link to="/chats" tag="li" active-class="active">  
          <a href="#">
            <i class="fa fa-fw fa-wechat"></i>
            <span>Tin Nhắn</span>
          </a>
        </router-link>
        <li class="header">CÀI ĐẶT</li>
        <router-link to="/settings" tag="li" active-class="active">  
          <a href="/settings">
            <i class="fa fa-cogs"></i>
            <span>Ứng Dụng</span>
          </a>
        </router-link>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {};
</script>

<style scoped>

.main-sidebar, li a {
  font-family: 'Baomoi_Light';
  font-weight: 200;
}

</style>
