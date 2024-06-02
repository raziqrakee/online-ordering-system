<template>
  <div>
    <Navbar></Navbar>
    <!-- MAIN -->
    <div id="checkout" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-5 mx-5">
        <div class="row">
          <div class="col-md-8 col-sm-6 p-4">
            <h3 class="text-2xl fw-bold mb-2">Customer Information</h3>
            <hr>
            <div class="mb-3">
              <input type="text" id="fullname" placeholder="Fullname" class="form-control mb-2">
              <input type="text" id="email" placeholder="Email" class="form-control mb-2">
              <input type="tel" id="phone" placeholder="Phone Number" class="form-control mb-2">
            </div>
            <h4 class="text-2xl fw-normal mb-2">Order Options</h4>
            <div id="order-options" class="row d-flex mb-3">
              <div class="col-6 position-relative">
                <button class="btn btn-order-option btn-block" @click="selectOrderOption('dine-in')">Dine-In</button>
                <img v-if="selectedOrderOption === 'dine-in'" src="@/static/icon/selected.png" class="selected-icon" />
              </div>
              <div class="col-6 position-relative">
                <button class="btn btn-order-option btn-block" @click="selectOrderOption('takeaway')">Takeaway</button>
                <img v-if="selectedOrderOption === 'takeaway'" src="@/static/icon/selected.png" class="selected-icon" />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 p-4">
            <h3 class="text-2xl fw-bold mb-2">Order Summary</h3>
            <hr>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between align-items-start px-0">
                <div class="d-flex flex-column">
                  <h6 class="text-lg mb-0">Strawberry</h6>
                  <span class="text-xs">Qty: 1</span>
                </div>
                <span class="text-lg">RM 10.00</span>
              </li>
              <hr>
              <li class="list-group-item d-flex justify-content-between align-items-center ps-5 pe-0">
                <h5 class="text-base">Subtotal:</h5>
                <span class="fw-600">RM 10.00</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center ps-5 pe-0">
                <h5 class="text-base">Tax:</h5>
                <span class="fw-600">RM 1.00</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center ps-5 pe-0">
                <h5 class="text-base">Total:</h5>
                <span class="fw-600">RM 11.00</span>
              </li>
            </ul>
          </div>
          <hr>
          <div class="row p-4">
            <div class="col-md-3 col-sm-12">
              <h4 class="text-2xl fw-normal mb-2">Payment Options</h4>
            </div>
            <div class="col-md-2 col-sm-6 mb-3 pt-sm-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="cash" name="payment_option" value="cash">
                <label class="form-check-label" for="cash">Cash</label>
              </div>
              <p class="sub-text">Pay at the counter</p>
            </div>
            <div class="col-md-4 col-sm-6 mb-3 pt-sm-1">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="direct_bank_transfer" name="payment_option" value="direct_bank_transfer">
                <label class="form-check-label" for="direct_bank_transfer">Direct Bank Transfer</label>
              </div>
              <p class="sub-text">Make payment directly through QR scan</p>
              <button class="btn btn-secondary btn-block" @click="openModal">Scan QR</button>
            </div>
            <div class="col-md-3 col-sm-12">
              <button class="btn btn-primary w-100 btn-block" @click="placeOrder">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
    <Footer></Footer>
    <!-- QR Modal -->
    <el-dialog title="Scan QR Code" :visible.sync="qrModalVisible">
      <div class="d-flex justify-content-center">
        <img src="@/static/qr-checkout.png" alt="QR Code" class="img-fluid qr-checkout">
      </div>
      <el-form class="mt-2">
        <label for="receipt" class="form-label">Upload Receipt:</label>
        <input type="file" id="receipt" class="form-control upload" accept="image/*">
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
    };
  },
  methods: {
    selectOrderOption(option) {
      this.selectedOrderOption = option;
    },
    placeOrder() {
      this.$router.push('/order-status');
    },
    openModal() {
      this.qrModalVisible = true;
    },
    saveAndClose() {
      this.qrModalVisible = false;
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
</style>
