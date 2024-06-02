<!-- AdminDashboard.vue -->
<template>
    <div class="admin-dashboard">
      <Sidebar></Sidebar>
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
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="stats" style="background-color: #FFE9F5; padding:20px; height: 80vh; margin: 0 20px;">
          <el-row :gutter="20">
            <el-col :span="8" style="margin-bottom:20px">
              <el-card shadow="hover">
                <div class="stat-card">
                  <img src="~/static/icon/total-product.png" class="stat-icon" alt="Total Products" />
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
                  <img src="~/static/icon/total-cust.png" class="stat-icon" alt="Total Customers" />
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
                  <img src="~/static/icon/total-order.png" class="stat-icon" alt="Total Orders" />
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
                  <img src="~/static/icon/total-sales-rsvr.png" class="stat-icon" alt="Total Sales" />
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
                  <img src="~/static/icon/total-sales-rsvr.png" class="stat-icon" alt="Total Reservation" />
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
  import Sidebar from '../components/Sidebar.vue';

  export default {
    components: {
    Sidebar, // Register the Sidebar component

  },
    data() {
      return {
        activeLink: 'dashboard',
      }
    },
    methods: {
    }
  }
  </script>

  <style>
  .admin-dashboard {
    display: flex;
    height: 100vh;
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
