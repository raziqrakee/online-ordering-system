<template>
  <div class="admin-product">
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

      <div class="admin-product-table">
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
            <tr v-for="report in salesReports" :key="report.id">
              <td>{{ report.reportId }}</td>
              <td>{{ report.date }}</td>
              <td>{{ report.orderIds.join(', ') }}</td>
              <td>{{ convertToRM(report.totalSale) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      salesReports: [],
      exchangeRate: 4.10, // Example exchange rate: 1 USD = 4.10 RM
    };
  },
  created() {
    // Fetch sales report data
    this.fetchSalesReportData();
  },
  //   created() {
//     // Fetch sales report data for the current month
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth() + 1;
//     const currentYear = currentDate.getFullYear();
//     this.fetchSalesReportData(currentMonth, currentYear);
//   },
  methods: {
    // fetchSalesReportData(month, year) {
    // switch (month) {
    //     case 1:
    //     // January sales report data
    //     this.salesReports = [
    //         { id: 1, reportId: 'SR001', date: '2024-01-01', orderIds: ['ORD001', 'ORD002', 'ORD003'], totalSale: 500 },
    //         // Add more sales report data for January as needed
    //     ];
    //     break;
    //     case 2:
    //     // February sales report data
    //     this.salesReports = [
    //         { id: 1, reportId: 'SR002', date: '2024-02-01', orderIds: ['ORD004', 'ORD005'], totalSale: 300 },
    //         // Add more sales report data for February as needed
    //     ];
    //     break;
    //     // Add cases for other months as needed
    //     default:
    //     // Default case (no data for other months)
    //     this.salesReports = [];
    // }
    // },
    fetchSalesReportData() {
      // Example data for demo
      this.salesReports = [
        { id: 1, reportId: 'SR001', date: '2024-01-01', orderIds: ['ORD001', 'ORD002', 'ORD003'], totalSale: 500 },
        { id: 2, reportId: 'SR002', date: '2024-02-01', orderIds: ['ORD004', 'ORD005'], totalSale: 300 },
        { id: 3, reportId: 'SR003', date: '2024-03-01', orderIds: ['ORD006', 'ORD007'], totalSale: 600 },
        { id: 4, reportId: 'SR004', date: '2024-04-01', orderIds: ['ORD008', 'ORD009'], totalSale: 700 },
        { id: 5, reportId: 'SR005', date: '2024-05-01', orderIds: ['ORD010', 'ORD011'], totalSale: 400 },
      ];
    },
    convertToRM(totalSaleUSD) {
      // Convert total sale from USD to RM using the exchange rate
      const totalSaleRM = totalSaleUSD * this.exchangeRate;
      // Format the total sale in RM currency format
      return `RM ${totalSaleRM.toFixed(2)}`;
    },
    printReport() {
      // Print only the table
      const printContents = document.querySelector('.admin-product-table').innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
  },
};
</script>

<style scoped>
.admin-product {
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
.admin-product-table {
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