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
                  <span class="stat-value">{{ totalProducts }}</span>
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
                  <span class="stat-value">{{ totalCustomers }}</span>
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
                  <span class="stat-value">{{ totalOrders }}</span>
                  <span class="stat-label">Total Orders</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="margin-bottom:20px">
            <el-card shadow="hover">
              <div class="stat-card">
                <img src="~/static/icon/total-sales.png" class="stat-icon" alt="Total Sales" />
                <div class="stat-info">
                  <span class="stat-value">RM {{ totalSales }}</span>
                  <span class="stat-label">Total Sales</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="margin-bottom:20px">
            <el-card shadow="hover">
              <div class="stat-card">
                <img src="~/static/icon/total-rsrv.png" class="stat-icon" alt="Total Reservation" />
                <div class="stat-info">
                  <span class="stat-value">{{ totalReservations }}</span>
                  <span class="stat-label">Total Reservations</span>
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
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      activeLink: 'dashboard',
      totalProducts: 0,
      totalCustomers: 0,
      totalOrders: 0,
      totalSales: 0,
      totalReservations: 0,
    }
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const token = this.$cookies.get('token');

        const [productsResponse, customersResponse, ordersResponse, reservationsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/products', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/reservations', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        this.totalProducts = productsResponse.data.products.length;
        this.totalCustomers = customersResponse.data.filter(user => user.role !== 'admin').length;
        this.totalOrders = ordersResponse.data.length;
        this.totalSales = ordersResponse.data.reduce((acc, order) => acc + parseFloat(order.total_amount), 0).toFixed(2);
        this.totalReservations = reservationsResponse.data.length;
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
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
