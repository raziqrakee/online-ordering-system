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
              <th scope="col">Total Amount (RM)</th>
              <th scope="col">Order Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>
                <div v-for="(item, index) in order.details" :key="index">
                  {{ item.quantity }} x {{ item.name }}
                </div>
              </td>
              <td>{{ order.type }}</td>
              <td>{{ order.amount }}</td>
              <td>
                <el-button :type="statusButtonColor(order.status)">{{ statusText(order.status) }}</el-button>
              </td>
              <td>
                <div class="d-flex gap-1">
                  <button class="btn btn-eye" @click="viewCustomerDetails(order)">👁️</button>
                  <button class="btn btn-accept" @click="acceptOrder(order.id)">✔</button>
                  <button class="btn btn-reject" @click="rejectOrder(order.id)">✖</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
    <el-dialog :visible.sync="showCustomerDetailsModalVisible" title="Customer Details">
      <div>
        <p><strong>Customer Name:</strong> {{ selectedOrder.customer }}</p>
        <p><strong>Customer Phone:</strong> {{ selectedOrder.customer_phone }}</p>
        <div v-for="(item, index) in selectedOrder.details" :key="index">
          <p><strong>Product:</strong> {{ item.name }}</p>
          <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCustomerDetailsModalVisible = false">Close</el-button>
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
        status: '',
      },
      selectedOrder: {
        id: '',
        type: '',
        amount: '',
        customer: '',
        customer_phone: '',
        details: [],
        status: '',
      },
      selectedStatus: 'All',
      orders: [
        { id: '001', type: 'Dine-in', amount: '250.00', customer: 'John Doe', customer_phone: '01123422089', details: [{ name: 'Ice Americano', quantity: 2 }], status: 'Pending' },
        { id: '002', type: 'Takeaway', amount: '120.00', customer: 'Jane Smith', customer_phone: '0134533378', details: [{ name: 'Ice Cream Strawberry', quantity: 1 }, { name: 'Ice Americano', quantity: 2 }], status: 'Completed' },
        { id: '003', type: 'Dine-in', amount: '450.00', customer: 'Alice Brown', customer_phone: '0198105991', details: [{ name: 'Ice Americano', quantity: 3 }], status: 'In-Process' },
        { id: '004', type: 'Takeaway', amount: '200.00', customer: 'Bob Johnson', customer_phone: '0198400668', details: [{ name: 'French Fries', quantity: 2 }], status: 'Cancelled' },
        { id: '005', type: 'Dine-in', amount: '300.00', customer: 'Charlie Lee', customer_phone: '0148652834', details: [{ name: 'Samyang Ramen', quantity: 1 }], status: 'Pending' },
      ],
      filteredOrders: [],
    };
  },
  mounted() {
    this.filterOrdersByStatus();
  },
  methods: {
    fetchOrders() {
      // Uncomment and use when integrating with an API
      // axios.get('http://localhost:8000/api/orders')
      //   .then(response => {
      //     if (response.data.status === 200) {
      //       this.orders = response.data.orders;
      //       this.filterOrdersByStatus();
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error fetching orders:', error);
      //   });
    },
    insertNewOrder() {
      // Uncomment and use when integrating with an API
      // axios.post('http://localhost:8000/api/orders', this.newOrder)
      //   .then(response => {
      //     if (response.data.status === 200) {
      //       this.fetchOrders();
      //       this.showAddModalVisible = false;
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error adding new order:', error);
      //   });

      // For demonstration purposes, adding new order to mock data
      this.orders.push({ ...this.newOrder, id: this.orders.length + 1 });
      this.filterOrdersByStatus();
      this.showAddModalVisible = false;
      this.newOrder = { id: '', type: '', amount: '', customer: '', customer_phone: '', details: [], status: '' };
    },
    acceptOrder(orderId) {
      const order = this.orders.find(order => order.id === orderId);
      if (order) {
        if (order.status === 'Pending') {
          order.status = 'In-Process';
        } else if (order.status === 'In-Process') {
          order.status = 'Completed';
        }
        this.filterOrdersByStatus();
      }
    },
    rejectOrder(orderId) {
      // Logic to reject the order
      const order = this.orders.find(order => order.id === orderId);
      if (order) order.status = 'Cancelled';
      this.filterOrdersByStatus();
    },
    filterOrdersByStatus() {
      if (this.selectedStatus === 'All') {
        this.filteredOrders = this.orders;
      } else {
        this.filteredOrders = this.orders.filter(order => order.status === this.selectedStatus);
      }
    },
    statusButtonColor(status) {
      switch (status) {
        case 'Pending':
          return 'warning';
        case 'Completed':
          return 'success';
        case 'Cancelled':
          return 'danger';
        case 'In Process':
          return '';
        default:
          return '';
      }
    },
    statusText(status) {
      switch (status) {
        case 'In-Process':
          return 'In-Process';
        case 'Cancelled':
          return 'Rejected';
        default:
          return status;
      }
    },
    viewCustomerDetails(order) {
      this.selectedOrder = { ...order };
      this.showCustomerDetailsModalVisible = true;
    },
  },
};
</script>

<style>
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
