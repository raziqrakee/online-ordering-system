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

      <div class="filter-section">
        <el-select v-model="filterType" placeholder="Select Filter">
          <el-option label="Weekly" value="weekly"></el-option>
          <el-option label="Monthly" value="monthly"></el-option>
        </el-select>
        <el-date-picker v-model="filterDate" type="date" placeholder="Pick a date"></el-date-picker>
        <el-button type="primary" @click="applyFilter">Apply Filter</el-button>
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
            <tr v-for="(report, index) in paginatedSalesReports" :key="index">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ report.date }}</td>
              <td>{{ report.orderIds.join(', ') }}</td>
              <td>{{ formatCurrency(report.totalSale) }}</td>
            </tr>
          </tbody>
        </table>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredSalesReports.length"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        ></el-pagination>
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
      filteredSalesReports: [],
      currentPage: 1,
      pageSize: 10,
      filterType: '',
      filterDate: '',
    };
  },
  computed: {
    paginatedSalesReports() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredSalesReports.slice(start, end);
    }
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
            this.filteredSalesReports = this.salesReports;
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
    handlePageChange(page) {
      this.currentPage = page;
    },
    applyFilter() {
      if (this.filterType && this.filterDate) {
        const filterDate = new Date(this.filterDate);
        if (this.filterType === 'weekly') {
          const startOfWeek = new Date(filterDate.setDate(filterDate.getDate() - filterDate.getDay()));
          const endOfWeek = new Date(filterDate.setDate(startOfWeek.getDate() + 6));
          this.filteredSalesReports = this.salesReports.filter(report => {
            const reportDate = new Date(report.date);
            return reportDate >= startOfWeek && reportDate <= endOfWeek;
          });
        } else if (this.filterType === 'monthly') {
          const selectedMonth = filterDate.getMonth();
          const selectedYear = filterDate.getFullYear();
          this.filteredSalesReports = this.salesReports.filter(report => {
            const reportDate = new Date(report.date);
            return reportDate.getMonth() === selectedMonth && reportDate.getFullYear() === selectedYear;
          });
        }
      } else {
        this.filteredSalesReports = this.salesReports;
      }
      this.currentPage = 1; // Reset to the first page
    }
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
.filter-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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
  .el-button,
  .filter-section,
  .el-pagination {
    display: none;
  }
}
</style>
