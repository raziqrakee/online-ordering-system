<template>
  <div class="admin-order">
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

      <div class="admin-order-table">
        <div class="table-header">
          <h1 class="title">Orders</h1>
          <div class="actions">
            <button class="btn btn-add" @click="showAddModalVisible = true">
              <span>Add Order</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Status Filter -->
        <div class="status-filter">
          <el-radio-group v-model="selectedStatus" @change="filterOrdersByStatus">
            <el-radio-button label="All">All</el-radio-button>
            <el-radio-button label="Pending">Pending</el-radio-button>
            <el-radio-button label="Completed">Completed</el-radio-button>
            <el-radio-button label="In-Process">In-Process</el-radio-button>
            <el-radio-button label="Cancelled">Cancelled</el-radio-button>
          </el-radio-group>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Order Details</th>
              <th scope="col">Type</th>
              <th scope="col">Total(RM)</th>
              <th scope="col">Payment Method</th>
              <th scope="col" class="text-center">Order Status</th>
              <th scope="col" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>
                <div v-for="(item, index) in order.details" :key="index">
                  {{ item.quantity }} x {{ item.name }}
                </div>
              </td>
              <td>{{ order.type }}</td>
              <td>{{ order.amount }}</td>
              <td>{{ order.payment_method }}</td>
              <td class="text-center">
                <el-button :type="statusButtonColor(order.status)">{{ statusText(order.status) }}</el-button>
              </td>
              <td>
                <div class="d-flex gap-1 justify-content-center">
                  <button class="btn btn-eye" @click="viewCustomerDetails(order)">👁️</button>
                  <button class="btn btn-accept" @click="acceptOrder(order.id)">✔</button>
                  <button class="btn btn-reject" @click="rejectOrder(order.id)">✖</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination justify-content-center" v-if="filteredOrders.length > pageSize">
          <button class="btn btn-secondary me-2" @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <button class="btn btn-secondary me-2" v-for="page in totalPages" :key="page" @click="gotoPage(page)" :class="{ 'active': currentPage === page }">{{ page }}</button>
          <button class="btn btn-secondary me-2" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>

    <!-- Modals (Edit, Delete, Add) -->
    <el-dialog :visible.sync="showAddModalVisible" title="Add Order">
      <el-form :model="newOrder">
        <!-- Form content for new order -->
        <el-form-item label="Order ID">
          <el-input v-model="newOrder.id"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-input v-model="newOrder.type"></el-input>
        </el-form-item>
        <el-form-item label="Total Amount (RM)">
          <el-input v-model="newOrder.amount"></el-input>
        </el-form-item>
        <el-form-item label="Customer Name">
          <el-input v-model="newOrder.customer"></el-input>
        </el-form-item>
        <el-form-item label="Customer Phone">
          <el-input v-model="newOrder.customer_phone"></el-input>
        </el-form-item>
        <el-form-item label="Order Details">
          <el-input v-model="newOrder.details"></el-input>
        </el-form-item>
        <el-form-item label="Payment Method">
          <el-select v-model="newOrder.payment_method" placeholder="Select payment method">
            <el-option label="Cash" value="Cash"></el-option>
            <el-option label="QR" value="QR"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Order Status">
          <el-select v-model="newOrder.status" placeholder="Select status">
            <el-option label="Pending" value="Pending"></el-option>
            <el-option label="Completed" value="Completed"></el-option>
            <el-option label="In-Process" value="In-Process"></el-option>
            <el-option label="Cancelled" value="Cancelled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertNewOrder">Save</el-button>
      </span>
    </el-dialog>

    <!-- Customer Details Modal -->
    <el-dialog :visible.sync="showCustomerDetailsModalVisible" class="bolder" title="Order Details">
      <div>
        <p><strong>Customer Name:</strong> {{ selectedOrder.customer }}</p>
        <p><strong>Customer Phone:</strong> {{ selectedOrder.customer_phone }}</p>
        <p><strong>Payment Method:</strong> {{ selectedOrder.payment_method }}</p>
        <p><strong>Product:</strong></p>
        <div v-for="(item, index) in selectedOrder.details" :key="index">
          <p>{{ item.name }} x {{ item.quantity }}</p>
        </div>
        <p v-if="selectedOrder.payment_method === 'QR' && selectedOrder.receipt">
          <strong>Receipt:</strong>
          <a href="#" @click="openReceiptModal(selectedOrder.receipt)">View Receipt</a>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCustomerDetailsModalVisible = false">Close</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showReceiptModal" class="receipt-modal" title="Receipt">
      <div class="d-flex justify-content-center">
        <img :src="selectedReceiptImageUrl" alt="Receipt" class="receipt-image img-fluid">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReceiptModal = false">Close</el-button>
      </span>
    </el-dialog>
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
      showReceiptModal: false,
      selectedReceiptImageUrl: '~/static/sample-receipt.png', //sample
      products: [],
      currentPage: 1,
      pageSize: 5,
      activeLink: 'orders',
      showAddModalVisible: false,
      showCustomerDetailsModalVisible: false,
      newOrder: {
        id: '',
        type: '',
        amount: '',
        customer: '',
        customer_phone: '',
        details: [],
        payment_method: '',
        status: '',
        receipt: '',
      },
      selectedOrder: {
        id: '',
        type: '',
        amount: '',
        customer: '',
        customer_phone: '',
        details: [],
        payment_method: '',
        status: '',
        receipt: '',
      },
      selectedStatus: 'All',
      orders: [
        { id: '001', type: 'Dine-in', amount: '250.00', customer: 'John Doe', customer_phone: '01123422089', details: [{ name: 'Iced Americano', quantity: 2 }], payment_method: 'Cash', status: 'Pending' },
        { id: '002', type: 'Takeaway', amount: '120.00', customer: 'Jane Smith', customer_phone: '0134533378', details: [{ name: 'Iced Cream Strawberry', quantity: 1 }, { name: 'Ice Americano', quantity: 2 }], payment_method: 'Cash', status: 'Completed' },
        { id: '003', type: 'Dine-in', amount: '450.00', customer: 'Alice Brown', customer_phone: '0198105991', details: [{ name: 'Iced Americano', quantity: 3 }], payment_method: 'QR', status: 'In-Process', receipt: '~/static/sample-receipt.png' },
        { id: '004', type: 'Takeaway', amount: '200.00', customer: 'Bob Johnson', customer_phone: '0198400668', details: [{ name: 'French Fries', quantity: 2 }], payment_method: 'Cash', status: 'Cancelled' },
        { id: '005', type: 'Dine-in', amount: '300.00', customer: 'Charlie Lee', customer_phone: '0148652834', details: [{ name: 'Samyang Ramen', quantity: 1 }, { name: 'Ice Americano', quantity: 1 }], payment_method: 'QR', status: 'Pending', receipt: '~/static/sample-receipt.png' },
        { id: '006', type: 'Dine-in', amount: '200.00', customer: 'David Kim', customer_phone: '0138997665', details: [{ name: 'Chicken Wings', quantity: 2 }, { name: 'Ice Americano', quantity: 1 }], payment_method: 'QR', status: 'In-Process', receipt: '~/static/sample-receipt.png' },
        { id: '007', type: 'Takeaway', amount: '100.00', customer: 'Eve Green', customer_phone: '0126735844', details: [{ name: 'French Fries', quantity: 1 }], payment_method: 'Cash', status: 'Pending' },
      ],
    };
  },
  computed: {
    filteredOrders() {
      if (this.selectedStatus === 'All') {
        return this.orders;
      } else {
        return this.orders.filter((order) => order.status === this.selectedStatus);
      }
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredOrders.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.pageSize);
    },
  },
  methods: {
    openReceiptModal(receiptImageUrl) {
      this.selectedReceiptImageUrl = receiptImageUrl;
      this.showReceiptModal = true;
    },
    statusButtonColor(status) {
      if (status === 'Pending') {
        return 'primary';
      } else if (status === 'Completed') {
        return 'success';
      } else if (status === 'In-Process') {
        return 'warning';
      } else if (status === 'Cancelled') {
        return 'danger';
      }
    },
    statusText(status) {
      if (status === 'Pending') {
        return 'Pending';
      } else if (status === 'Completed') {
        return 'Completed';
      } else if (status === 'In-Process') {
        return 'In-Process';
      } else if (status === 'Cancelled') {
        return 'Cancelled';
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    filterOrdersByStatus() {
      this.currentPage = 1;
    },
    viewCustomerDetails(order) {
      this.selectedOrder = {
        id: order.id,
        type: order.type,
        amount: order.amount,
        customer: order.customer,
        customer_phone: order.customer_phone,
        details: order.details,
        payment_method: order.payment_method,
        status: order.status,
        receipt: order.receipt,
      };
      this.showCustomerDetailsModalVisible = true;
    },
    insertNewOrder() {
      this.orders.push(this.newOrder);
      this.showAddModalVisible = false;
      this.newOrder = {
        id: '',
        type: '',
        amount: '',
        customer: '',
        customer_phone: '',
        details: [],
        payment_method: '',
        status: '',
      };
    },
    acceptOrder(orderId) {
      const order = this.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = 'Completed';
      }
    },
    rejectOrder(orderId) {
      const order = this.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = 'Cancelled';
      }
    },
  },
};
</script>

<style>
.receipt-image{
  width: 300px;
}
.admin-order {
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
.search {
  width: 300px;
}
.user {
  cursor: pointer;
}
.admin-order-table {
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
.title {
  font-size: 24px;
  font-weight: bold;
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-secondary {
  background-color: #FFE9F5;
  color: #000000;
  border-color: #FFE9F5;
}
.btn span {
  margin-right: 8px;
}
.btn-icon {
  width: 20px;
  height: 20px;
}
.btn-filter {
  background-color: #fff;
  color: #000;
}
.btn-filter:hover {
  background-color: #f0f0f0;
}
.dropdown-menu {
  display: none;
}
.btn-add {
  background-color: #FFE9F5;
  color: #000000;
}
.btn-add:hover {
  background-color: #6c757d;
  color: #ffffff;
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
.btn-accept {
  color: white;
  padding: 1px 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.btn-accept:hover {
  background-color: #67C23A;
}
.btn-reject {
  color: white;
  padding: 1px 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.btn-reject:hover {
  background-color: #F56C6C;
}
.btn-eye {
  color: white;
  padding: 1px 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.btn-eye:hover {
  background-color: #409EFF;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.status-filter {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}
.status-filter .el-radio-group {
  display: flex;
  gap: 10px;
}
.table .el-button {
  padding: 4px 10px;
  border-radius: 60px;
}
</style>
