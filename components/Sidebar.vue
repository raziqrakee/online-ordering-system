<template>
  <div class="sidebar" style="padding-left: 0px; padding-right: 0px;">
    <div class="logo">
      <img src="~/static/logo.png" alt="Logo" class="img-fluid" width="98px">
    </div>
    <el-menu :default-active="activeLink" class="sidebar-menu" @select="handleSelect">
      <el-menu-item index="dashboard" class="custom-sidebar-item">
        <i class="el-icon-menu"></i>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="product" class="custom-sidebar-item">
        <i class="el-icon-goods"></i>
        <span>Product</span>
      </el-menu-item>
      <el-menu-item index="order" class="custom-sidebar-item">
        <i class="el-icon-shopping-cart-2"></i>
        <span>Order</span>
      </el-menu-item>
      <el-menu-item index="reservation" class="custom-sidebar-item">
        <i class="el-icon-date"></i>
        <span>Reservation</span>
      </el-menu-item>
      <el-menu-item index="sales" class="custom-sidebar-item">
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
      activeLink: '{index}'
    };
  },
  methods: {
    handleSelect(index) {
      this.activeLink = index;
      this.$router.push(`/admin-${index}`);
    },
    logout() {
      this.$cookies.remove('token');
      window.location.href = 'login';
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #FFE9F5;
  color: #fff;
  padding: 20px;
  width: 200px;
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
}
.logout {
  position: absolute;
  bottom: 20px;
  left: 40px;
  right: 20px;
}
</style>
