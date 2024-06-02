<template>
  <div class="sidebar" style="padding-left: 0px; height: 100vh; padding-right: 0px;">
    <div class="logo">
      <img src="~/static/logo.png" alt="Logo" class="img-fluid" width="98px">
    </div>
    <el-menu :default-active="activeLink" class="sidebar-menu" @select="handleSelect">
      <el-menu-item index="dashboard" :class="sidebarItemClass('dashboard')">
        <i class="el-icon-menu"></i>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="product" :class="sidebarItemClass('product')">
        <i class="el-icon-goods"></i>
        <span>Product</span>
      </el-menu-item>
      <el-menu-item index="order" :class="sidebarItemClass('order')">
        <i class="el-icon-shopping-cart-2"></i>
        <span>Order</span>
      </el-menu-item>
      <el-menu-item index="reservation" :class="sidebarItemClass('reservation')">
        <i class="el-icon-date"></i>
        <span>Reservation</span>
      </el-menu-item>
      <el-menu-item index="sales" :class="sidebarItemClass('sales')">
        <i class="el-icon-document"></i>
        <span>Sale Report</span>
      </el-menu-item>
    </el-menu>
    <div class="logout">
      <el-button type="danger" icon="el-icon-switch-button" round @click="logout()">Logout</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 'dashboard'
    };
  },
  methods: {
    handleSelect(index) {
      // Set the active link to the selected index
      this.activeLink = index;
      
      // Redirect to the corresponding route
      this.$router.push(`/admin-${index}`);
    },
    logout() {
      this.$cookies.remove('token');
      window.location.href = 'login';
    },
    sidebarItemClass(link) {
      return {
        'custom-sidebar-item': true,
        'active': this.activeLink === link
      };
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #FFE9F5;
  color: #fff;
  padding: 20px;
  min-width: 200px;
}
.logo {
  text-align: center;
  margin-bottom: 20px;
}
.sidebar-menu {
  border-right: none;
}
.custom-sidebar-item {
  background-color: #FFE9F5;
  display: flex;
  align-items: center;
  color: #000000;
}
.custom-sidebar-item:active,
.custom-sidebar-item:hover,
.custom-sidebar-item:focus {
  color: #66b1ff;
  text-decoration: none;
}
.custom-sidebar-item:hover .el-icon-menu,
.custom-sidebar-item:hover .el-icon-goods,
.custom-sidebar-item:hover .el-icon-shopping-cart-2,
.custom-sidebar-item:hover .el-icon-date,
.custom-sidebar-item:hover .el-icon-document,
.custom-sidebar-item:active .el-icon-menu,
.custom-sidebar-item:active .el-icon-goods,
.custom-sidebar-item:active .el-icon-shopping-cart-2,
.custom-sidebar-item:active .el-icon-date,
.custom-sidebar-item:active .el-icon-document {
  color: #66b1ff;
}
.logout {
  position: absolute;
  bottom: 20px;
  left: 40px;
  right: 20px;
}
</style>
