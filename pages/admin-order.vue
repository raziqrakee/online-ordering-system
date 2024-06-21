<template>
  <div class="admin-order">
    <Sidebar></Sidebar>
    <div class="content">
      <div class="header">
        <div class="search">
          <el-input v-model="searchQuery" placeholder="Search" prefix-icon="el-icon-search" @input="searchOrders"></el-input>
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
            <button class="btn btn-add" @click="prepareNewOrder">
              <span>Add Order</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div class="status-filter">
          <el-radio-group v-model="selectedStatus" @change="filterOrdersByStatus">
            <el-radio-button label="All">All</el-radio-button>
            <el-radio-button label="Pending">Pending</el-radio-button>
            <el-radio-button label="In-Process">In-Process</el-radio-button>
            <el-radio-button label="Completed">Completed</el-radio-button>
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
                <div v-for="(item, index) in order.items" :key="index">
                  {{ item.quantity }} x {{ item.product.name }}
                </div>
              </td>
              <td>{{ order.order_type }}</td>
              <td>{{ order.total_amount }}</td>
              <td>{{ order.payment_method }}</td>
              <td class="text-center">
                <el-button :type="statusButtonColor(order.order_status)" @click="changeOrderStatus(order)">
                  {{ statusText(order.order_status) }}
                </el-button>
              </td>
              <td>
                <div class="d-flex flex-row gap-2 p-6 justify-between whitespace-nowrap text-sm text-gray-500">
                  <img src="/icon/view.png" alt="View Details" class="btn-list-img cursor-pointer" @click="viewCustomerDetails(order)">
                  <img src="/icon/tick.png" alt="Accept Order" class="btn-list-img w-6 cursor-pointer" @click="acceptOrder(order)">
                  <img src="/icon/cancel.png" alt="Reject Order" class="btn-list-img w-6 cursor-pointer" @click="rejectOrder(order)">
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

    <el-dialog :visible.sync="showAddModalVisible" title="Add Order">
      <el-form :model="newOrder">
        <el-form-item label="User ID" v-if="!newOrder.user_id">
          <el-input v-model="newOrder.user_id" placeholder="Enter User ID"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="newOrder.order_type" placeholder="Select order type">
            <el-option label="Dine-In" value="dine-in"></el-option>
            <el-option label="Takeaway" value="takeaway"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Order Details">
          <div v-for="(item, index) in newOrder.items" :key="index" class="product-selection w-100">
            <el-select v-model="item.product_id" placeholder="Select product" @change="updateSelectedProduct(index)">
              <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id">
                {{ product.name }} - RM{{ product.price }}
              </el-option>
            </el-select>
            <div class="quantity-selector">
              <el-button @click="decrementQuantity(index)">-</el-button>
              <el-input class="text-center" v-model="item.quantity" min="1" @change="updateTotalAmount"></el-input>
              <el-button @click="incrementQuantity(index)">+</el-button>
            </div>
            <el-button type="danger" @click="removeProduct(index)">Remove</el-button>
          </div>
          <el-button type="primary" @click="addProduct">Add Product</el-button>
        </el-form-item>
        <el-form-item label="Total Amount (RM)">
          <el-input v-model="newOrder.total_amount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Special Instructions">
          <el-input type="textarea" v-model="newOrder.special_instructions"></el-input>
        </el-form-item>
        <el-form-item label="Payment Method">
          <el-select v-model="newOrder.payment_method" placeholder="Select payment method">
            <el-option label="Cash" value="cash"></el-option>
            <el-option label="Direct Bank Transfer" value="direct_bank_transfer"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertNewOrder">Save</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showCustomerDetailsModalVisible" title="Order Details">
      <div>
        <p><strong>Customer Name:</strong> {{ selectedOrder.user.name }}</p>
        <p><strong>Customer Phone:</strong> {{ selectedOrder.user.contact_number }}</p>
        <p><strong>Special Instructions:</strong> {{ selectedOrder.special_instructions }}</p>
        <p><strong>Order Items:</strong></p>
        <div v-for="(item, index) in selectedOrder.items" :key="index">
          <p>{{ item.product.name }} x {{ item.quantity }}</p>
        </div>
        <p><strong>Total Amount:</strong> RM {{ selectedOrder.total_amount }}</p>
        <p v-if="selectedOrder.payment_method === 'direct_bank_transfer' && selectedOrder.receipt_path">
          <strong>Receipt:</strong>
          <a href="#" @click="openReceiptModal(selectedOrder.receipt_path)">View Receipt</a>
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
      selectedReceiptImageUrl: '',
      products: [],
      currentPage: 1,
      pageSize: 5,
      activeLink: 'orders',
      showAddModalVisible: false,
      showCustomerDetailsModalVisible: false,
      searchQuery: '', // Added search query data property
      newOrder: {
        user_id: '',
        order_type: '',
        total_amount: 0,
        items: [],
        special_instructions: '',
        payment_method: '',
        order_status: 'Pending',
      },
      selectedOrder: {
        id: '',
        order_type: '',
        total_amount: 0,
        user: {
          name: '',
          contact_number: '',
        },
        items: [],
        payment_method: '',
        special_instructions: '',
        order_status: '',
        receipt_path: '', // Added to ensure receipt path is handled
      },
      selectedStatus: 'All',
      orders: [],
    };
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders;

      // Apply status filter
      if (this.selectedStatus !== 'All') {
        filtered = filtered.filter(order => order.order_status === this.selectedStatus.toLowerCase());
      }

      // Apply search filter
      if (this.searchQuery) {
        filtered = filtered.filter(order =>
          order.id.toString().includes(this.searchQuery) ||
          order.order_type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.payment_method.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
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
  created() {
    this.fetchOrders();
    this.fetchProducts();
  },
  methods: {
    async fetchOrders() {
      try {
        const token = this.$cookies.get('token');
        const response = await this.$axios.get('http://localhost:8000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        this.products = response.data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    openReceiptModal(receiptImageUrl) {
      this.selectedReceiptImageUrl = `http://localhost:8000/${receiptImageUrl}`;
      this.showReceiptModal = true;
    },
    statusButtonColor(status) {
      if (status === 'pending') {
        return 'primary';
      } else if (status === 'completed') {
        return 'success';
      } else if (status === 'in-process') {
        return 'warning';
      } else if (status === 'cancelled') {
        return 'danger';
      }
    },
    statusText(status) {
      if (status === 'pending') {
        return 'Pending';
      } else if (status === 'completed') {
        return 'Completed';
      } else if (status === 'in-process') {
        return 'In-Process';
      } else if (status === 'cancelled') {
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
      this.selectedOrder = { ...order };
      this.showCustomerDetailsModalVisible = true;
    },
    updateSelectedProduct(index) {
      const selectedProductId = this.newOrder.items[index].product_id;
      const selectedProduct = this.products.find(product => product.id === selectedProductId);
      this.newOrder.items[index].product = selectedProduct;
      this.updateTotalAmount();
    },
    updateTotalAmount() {
      const total = this.newOrder.items.reduce((acc, item) => {
        if (item.product && item.quantity) {
          return acc + (item.product.price * item.quantity);
        }
        return acc;
      }, 0);
      const tax = total * 0.1;
      this.newOrder.total_amount = (total + tax).toFixed(2);
    },
    addProduct() {
      this.newOrder.items.push({ product_id: null, product: null, quantity: 1 });
    },
    removeProduct(index) {
      this.newOrder.items.splice(index, 1);
      this.updateTotalAmount();
    },
    incrementQuantity(index) {
      this.newOrder.items[index].quantity++;
      this.updateTotalAmount();
    },
    decrementQuantity(index) {
      if (this.newOrder.items[index].quantity > 1) {
        this.newOrder.items[index].quantity--;
        this.updateTotalAmount();
      }
    },
    prepareNewOrder() {
      this.newOrder = {
        user_id: '',
        order_type: '',
        total_amount: 0,
        items: [],
        special_instructions: '',
        payment_method: '',
        order_status: 'Pending',
      };
      this.showAddModalVisible = true;
    },
    async insertNewOrder() {
      try {
        const token = this.$cookies.get('token');
        const newOrderData = {
          ...this.newOrder,
          items: this.newOrder.items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          }))
        };
        const response = await this.$axios.post('http://localhost:8000/api/orders', newOrderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.orders.push(response.data);
        this.showAddModalVisible = false;
        this.newOrder = {
          user_id: '',
          order_type: '',
          total_amount: 0,
          items: [],
          special_instructions: '',
          payment_method: '',
          order_status: 'Pending',
        };

        window.location.reload()
      } catch (error) {
        console.error('Error adding new order:', error);
      }
    },
    async acceptOrder(order) {
      if (order.order_status === 'pending') {
        order.order_status = 'in-process';
        await this.updateOrderStatus(order);
      } else if (order.order_status === 'in-process') {
        order.order_status = 'completed';
        await this.updateOrderStatus(order);
      }
    },
    async rejectOrder(order) {
      order.order_status = 'cancelled';
      await this.updateOrderStatus(order);
    },
    async changeOrderStatus(order) {
      try {
        let updatedStatus;
        if (order.order_status === 'pending') {
          updatedStatus = 'in-process';
        } else if (order.order_status === 'in-process') {
          updatedStatus = 'completed';
        } else if (order.order_status === 'cancelled') {
          updatedStatus = 'cancelled';
        }

        const token = this.$cookies.get('token');
        const response = await this.$axios.put(`http://localhost:8000/api/orders/${order.id}/status`, {
          order_status: updatedStatus,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        order.order_status = response.data.order_status;
        order.customer_order_status = response.data.customer_order_status;
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    },
    async updateOrderStatus(order) {
      try {
        const token = this.$cookies.get('token');
        const response = await this.$axios.put(`http://localhost:8000/api/orders/${order.id}/status`, {
          order_status: order.order_status,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        order.order_status = response.data.order_status;
        order.customer_order_status = response.data.customer_order_status;
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    },
    searchOrders() {
      this.currentPage = 1;
    }
  },
};
</script>

<style>
.btn-list-img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.receipt-image {
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
.product-selection {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 5px;
}
.el-input__inner{
  text-align: center;
}
</style>
