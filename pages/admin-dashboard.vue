<!-- AdminDashboard.vue -->
<template>
    <div class="admin-dashboard">
      <div class="sidebar" style="padding-left: 0px; padding-right: 0px;">
        <div class="logo">
          <img src="~/static/logo.png" alt="Logo" class="img-fluid" width="98px">
        </div>
        <el-menu :default-active="activeLink" class="sidebar-menu">
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
          <el-menu-item index="report" class="custom-sidebar-item">
            <i class="el-icon-document"></i>
            <span>Sale Report</span>
          </el-menu-item>
        </el-menu>
        <div class="logout">
          <el-button type="danger" icon="el-icon-switch-button" round @click="logout()">Logout</el-button>
        </div>
      </div>
      <div class="content" style="background-color: #f6f6f6;padding: 0px;">
        <div class="header" style="background-color: #fff; padding: 20px">
          <div class="search">
            <el-input placeholder="Search" prefix-icon="el-icon-search"></el-input>
          </div>
          <div class="user">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                Admin <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item>Settings</el-dropdown-item>
                <el-dropdown-item @click="logout()">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="stats" style="background-color: #FFE9F5; padding:20px; height: 80vh; margin: 0 20px;">
          <el-row :gutter="20">
            <el-col :span="8" style="margin-bottom:20px">
              <el-card shadow="hover">
                <div class="stat-card">
                  <i class="el-icon-goods stat-icon"></i>
                  <div class="stat-info">
                    <span class="stat-value">20</span>
                    <span class="stat-label">Total Products</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="margin-bottom:20px">
              <el-card shadow="hover">
                <div class="stat-card">
                  <i class="el-icon-goods stat-icon"></i>
                  <div class="stat-info">
                    <span class="stat-value">20</span>
                    <span class="stat-label">Total Customers</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="margin-bottom:20px">
              <el-card shadow="hover">
                <div class="stat-card">
                  <i class="el-icon-goods stat-icon"></i>
                  <div class="stat-info">
                    <span class="stat-value">20</span>
                    <span class="stat-label">Total Orders</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="margin-bottom:20px">
              <el-card shadow="hover">
                <div class="stat-card">
                  <i class="el-icon-goods stat-icon"></i>
                  <div class="stat-info">
                    <span class="stat-value">20</span>
                    <span class="stat-label">Total Sales</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="margin-bottom:20px">
              <el-card shadow="hover">
                <div class="stat-card">
                  <i class="el-icon-goods stat-icon"></i>
                  <div class="stat-info">
                    <span class="stat-value">20</span>
                    <span class="stat-label">Total Reservation</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <!-- Add similar columns for other stats -->
          </el-row>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeLink: 'dashboard',
      }
    },
    methods:{
        logout(){
            this.$cookies.remove("token")
            // this.$router.push("/login")
            window.location.href = "login"
        }
    }
  }
  </script>
  
  <style>
  
  /* Add custom styles for the admin dashboard */
  .admin-dashboard {
    display: flex;
    height: 100vh;
  }
  
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

  .custom-sidebar-item{
    background-color: #FFE9F5;
  }
  
  .logout {
    position: absolute;
    bottom: 20px;
    left: 40px;
    right: 20px;
  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search {
    width: 300px;
  }
  
  .user {
    cursor: pointer;
  }
  
  .stats {
    margin-top: 20px;
  }
  
  .stat-card {
    display: flex;
    align-items: center;
  }
  
  .stat-icon {
    font-size: 36px;
    margin-right: 10px;
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: bold;
  }
  
  .stat-label {
    font-size: 14px;
    color: #888;
  }
  </style>