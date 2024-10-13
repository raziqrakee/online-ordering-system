<template>
  <div>
    <Navbar></Navbar>
    <div id="checkout" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-5 mx-5">
        <div class="row">
          <div class="col-md-8 col-sm-6 p-4">
            <h3 class="text-2xl fw-bold mb-2">Customer Information</h3>
            <hr>
            <div class="mb-3">
              <input type="text" v-model="form.fullname" id="name" placeholder="Fullname" class="form-control mb-2">
              <div v-if="errors.fullname" class="text-danger">{{ errors.fullname }}</div>
              <input type="text" v-model="form.email" id="email" placeholder="Email" class="form-control mb-2">
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
              <input type="tel" v-model="form.phone" id="contact_number" placeholder="Phone Number" class="form-control mb-2">
              <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>
            <h4 class="text-2xl fw-normal mb-2">Order Options</h4>
            <div id="order-options" class="row d-flex mb-3">
              <div class="col-6 position-relative">
                <button :class="{'btn-order-option-selected': selectedOrderOption === 'dine-in'}" class="btn btn-order-option btn-block" @click="selectOrderOption('dine-in')">Dine-In</button>
              </div>
              <div class="col-6 position-relative">
                <button :class="{'btn-order-option-selected': selectedOrderOption === 'takeaway'}" class="btn btn-order-option btn-block" @click="selectOrderOption('takeaway')">Takeaway</button>
              </div>
            </div>
            <div v-if="errors.order_type" class="text-danger">{{ errors.order_type }}</div>
          </div>
          <div class="col-md-4 col-sm-6 p-4">
            <h3 class="text-2xl fw-bold mb-2">Order Summary</h3>
            <hr>
            <ul class="list-group">
              <li v-for="(item, index) in cart" :key="index" class="list-group-item d-flex justify-content-between align-items-center py-2">
                <div class="d-flex flex-column">
                  <h6 class="text-lg mb-0">{{ item.name }}</h6>
                  <span class="text-xs">Qty: {{ item.quantity }}</span>
                </div>
                <span class="text-lg">RM {{ item.price * item.quantity }}</span>
              </li>
              <hr class="d-flex align-self-center" style="width: 90%;">
              <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                Subtotal:
                <span>RM {{ calculateSubtotal() }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                Tax (10%):
                <span>RM {{ calculateTax() }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                Total:
                <span>RM {{ calculateTotal() }}</span>
              </li>
              <div class="list-group-item">
                <button class="btn btn-primary w-100 btn-block" @click="placeOrder">Place Order</button>
              </div>
            <div class="list-group-item">
              <button class="btn btn-secondary w-100 btn-block" @click="cancelOrder">Cancel</button>
            </div>
            </ul>
          </div>
          <hr>
          <div class="row p-4">
            <div class="col-md-3 col-sm-12">
              <h4 class="text-2xl fw-normal mb-2">Payment Options</h4>
            </div>
            <div class="col-md-2 col-sm-6 mb-3 pt-sm-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="cash" name="payment_option" value="cash" v-model="form.payment_method">
                <label class="form-check-label" for="cash">Cash</label>
              </div>
              <p class="sub-text">Pay at the counter</p>
            </div>
            <div class="col-md-4 col-sm-6 mb-3 pt-sm-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="direct_bank_transfer" name="payment_option" value="direct_bank_transfer" v-model="form.payment_method">
                <label class="form-check-label" for="direct_bank_transfer">Direct Bank Transfer</label>
              </div>
              <p class="sub-text">Make payment directly through QR scan</p>
              <button v-if="form.payment_method === 'direct_bank_transfer'" class="btn btn-secondary btn-block" @click="openModal">Scan QR</button>
              <div v-if="errors.receipt" class="text-danger">{{ errors.receipt }}</div>
            </div>
            <div v-if="errors.payment_method" class="text-danger">{{ errors.payment_method }}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <el-dialog title="Scan QR Code" :visible.sync="qrModalVisible">
      <div class="d-flex justify-content-center">
        <img src="@/static/qr-checkout.png" alt="QR Code" class="img-fluid qr-checkout">
      </div>
      <el-form class="mt-2">
        <label for="receipt" class="form-label">Upload Receipt:</label>
        <input type="file" id="receipt" class="form-control upload" accept="image/*" @change="handleReceiptUpload">
      </el-form>
      <span slot="footer" class="dialog-footer d-flex justify-content-center">
        <el-button class="btn btn-w" type="secondary" @click="qrModalVisible = false">Cancel</el-button>
        <el-button class="btn btn-w" type="primary" @click="saveAndClose">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      qrModalVisible: false,
      selectedOrderOption: '',
      form: {
        user_id: '',
        fullname: '',
        email: '',
        phone: '',
        payment_method: '',
        order_type: '',
        special_instructions: localStorage.getItem('specialInstructions') || '', // Load special instructions from localStorage
      },
      errors: {},
      cart: [],
      receipt: null,
    };
  },
  created() {
    this.loadCart();
    this.getProfile();
  },
  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    cancelOrder() {
      this.$router.push('/');
    },
    async getProfile() {
      try {
        const userId = this.$cookies.get('id');
        const token = this.$cookies.get('token');
        const response = await this.$axios.get(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response && response.data) {
          this.form.user_id = userId;
          this.form.fullname = response.data.name;
          this.form.email = response.data.email;
          this.form.phone = response.data.contact_number;
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    },
    selectOrderOption(option) {
      this.selectedOrderOption = option;
      this.form.order_type = option;
    },
    calculateSubtotal() {
      return this.cart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    },
    calculateTax() {
      return (this.calculateSubtotal() * 0.1).toFixed(2);
    },
    calculateTotal() {
      return (parseFloat(this.calculateSubtotal()) + parseFloat(this.calculateTax())).toFixed(2);
    },
    validateForm() {
      this.errors = {};
      if (!this.form.fullname) {
        this.errors.fullname = 'Fullname is required';
      }
      if (!this.form.email) {
        this.errors.email = 'Email is required';
      }
      if (!this.form.phone) {
        this.errors.phone = 'Phone number is required';
      }
      if (!this.form.order_type) {
        this.errors.order_type = 'Order type is required';
      }
      if (!this.form.payment_method) {
        this.errors.payment_method = 'Payment method is required';
      }
      if (this.form.payment_method === 'direct_bank_transfer' && !this.receipt) {
        this.errors.receipt = 'Receipt is required for direct bank transfer';
      }
      return Object.keys(this.errors).length === 0;
    },
    async placeOrder() {
      if (!this.validateForm()) {
        return;
      }

      const token = this.$cookies.get('token');
      const formData = new FormData();

      formData.append('user_id', this.form.user_id);
      formData.append('total_amount', this.calculateTotal());
      formData.append('payment_method', this.form.payment_method);
      formData.append('order_type', this.form.order_type);
      formData.append('special_instructions', this.form.special_instructions);

      this.cart.forEach((item, index) => {
        formData.append(`items[${index}][product_id]`, item.id);
        formData.append(`items[${index}][quantity]`, item.quantity);
        formData.append(`items[${index}][price]`, item.price);
      });

      if (this.receipt) {
        formData.append('receipt', this.receipt);
      }

      try {
        const response = await this.$axios.post('http://localhost:8000/api/orders', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response && response.data && response.status === 201) {
          console.log('Order placed successfully');
          this.$notify({
            title: 'Success',
            message: 'Order placed successfully',
            type: 'success',
          });
          setTimeout(() => {
            localStorage.removeItem('cart');
            localStorage.removeItem('specialInstructions');
            localStorage.setItem('lastOrderId', response.data.id); 
            this.$router.push(`/order-status/${response.data.id}`);
          }, 2000); // 2 seconds delay
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error placing order:', error.response ? error.response.data : error);
      }
    },
    handleReceiptUpload(event) {
      this.receipt = event.target.files[0];
    },
    openModal() {
      this.qrModalVisible = true;
    },
    saveAndClose() {
      this.qrModalVisible = false;
    },
  },
  watch: {
    'form.special_instructions': {
      handler(newVal) {
        localStorage.setItem('specialInstructions', newVal);
      },
      deep: true,
    },
  },
}
</script>


<style>
.menu {
  border-bottom: 1px solid #e6e6e6;
}
.text-xs {
  font-size: 0.75rem;
}
.el-submenu__icon-arrow {
  display: none !important;
}
.qtt {
  width: 60px !important;
}
.btn-primary {
  background-color: #000000;
  border-color: #00000000;
}
.btn-primary:hover {
  background-color: #FFE9F5;
  border-color: #F390C7;
  color: #000000;
}
.list-group-item {
  border: #00000000;
}
.product-list-img {
  width: 60px;
}
.sub-text {
  font-size: 0.75rem;
  color: #828282;
}
.form-control {
  min-height: 35px !important;
}
.qr-checkout {
  height: 250px !important;
}
.btn-w {
  min-width: 160px;
  justify-content: center;
}
.el-button--primary {
  background: #000000;
  border-color: #000000;
  color: #FFFFFF;
}
.el-button--primary:hover {
  background: #409EFF;
  border-color: #409EFF;
  color: #FFFFFF;
}
.el-button--secondary {
  background: #FFE9F5;
  border-color: #FFE9F5;
  color: #000000;
}
.el-button--secondary:hover {
  background-color: #F56C6C;
  border-color: #F56C6C;
  color: #FFFFFF;
}
#order-options button {
  min-height: 90px;
  border-color: #F390C760;
  border-radius: 10px;
  width: 100%;
}
#order-options button:hover {
  background-color: #F390C7;
  color: #ffffff;
  border-color: #F390C7;
}
#order-options button:active,
#order-options button:focus {
  background-color: #F390C780;
  border-color: #F390C7;
}
.selected-icon {
  position: absolute;
  top: 10px;
  right: 20px;
  width: 24px;
  height: 24px;
}
.btn-order-option-selected {
  background-color: #F390C7;
  color: #ffffff;
}
</style>
