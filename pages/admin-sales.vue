<template>
  <div class="admin-sales">
    <!-- Sidebar component -->
    <Sidebar></Sidebar>

    <div class="content">
      <div class="header">
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

      <div class="admin-sales-table">
        <div class="table-header">
          <h1 class="title">Sales Report</h1>
          <el-button type="primary" @click="printReport">Print Report</el-button>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Report ID</th>
              <th scope="col">Date</th>
              <th scope="col">Order IDs</th>
              <th scope="col">Total Sale (RM)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in salesReports" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ report.date }}</td>
              <td>{{ report.orderIds.join(', ') }}</td>
              <td>{{ formatCurrency(report.totalSale) }}</td>
            </tr>
          </tbody>
        </table>
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
      salesReports: [],
    };
  },
  created() {
    // Fetch sales report data
    this.fetchSalesReportData();
  },
  methods: {
    fetchSalesReportData() {
      axios.get('http://localhost:8000/api/sales-reports')
        .then(response => {
          if (response.data.status === 200) {
            this.salesReports = response.data.salesReports;
          } else {
            console.error('Failed to fetch sales report data:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching sales report data:', error.response ? error.response.data : error.message);
        });
    },
    formatCurrency(amount) {
      // Format the total sale in RM currency format
      return `RM ${amount.toFixed(2)}`;
    },
    printReport() {
      // Print only the table
      const printContents = document.querySelector('.admin-sales-table').innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
  },
};
</script>

<style scoped>
.admin-sales {
  display: flex;
  height: 100vh;
}
.content {
  flex: 1;
  background-color: #f6f6f6;
  padding: 0 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.admin-sales-table {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
@media print {
  .header,
  .el-button {
    display: none;
  }
}
</style>
