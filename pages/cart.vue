<template>
  <div>
    <Navbar></Navbar>
    <!-- MAIN -->
    <div id="cart" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-5 mx-5">
        <div class="row">
          <div class="col-md-8 col-sm-6 p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="text-2xl fw-bold mb-2">My Cart</h3>
              <button class="btn btn-link p-0" @click="toggleDelete">{{ showDelete ? 'Done' : 'Edit Order' }}</button>
            </div>
            <hr>
            <div v-for="(item, index) in cart" :key="index" class="d-flex justify-content-between align-items-center gap-2">
              <div class="d-flex align-items-center gap-2">
                <img :src="item.image" alt="Product Icon" class="product-list-img">
                <span class="text-lg">{{ item.name }}</span>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <div class="d-flex align-items-center gap-2">
                  <span class="text-lg">Quantity:</span>
                  <div class="btn-group" role="group">
                    <input type="number" v-model="item.quantity" :readonly="!showDelete" class="form-control qtt" min="1">
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="text-lg">x</span>
                  <span class="text-lg">RM{{ item.price }}</span>
                  <img v-if="showDelete" src="/assets/delete-product.svg" alt="Delete Product" class="delete-icon ms-2" @click="removeProduct(index)">
                </div>
              </div>
            </div>
            <hr>
            <div class="mt-3">
              <label for="special-instructions" class="form-label mb-3">Special Instructions:</label>
              <textarea class="form-control w-100" id="special-instructions" rows="4"></textarea>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 p-4">
            <h3 class="text-2xl fw-bold mb-2">Order Summary</h3>
            <hr>
            <ul class="list-group">
              <li v-if="cart.length" class="list-group-item d-flex justify-content-between align-items-center py-2">
                Subtotal:
                <span class="">RM {{ calculateSubtotal() }}</span>
              </li>
              <li v-if="cart.length" class="list-group-item d-flex justify-content-between align-items-center py-2">
                Tax (10%):
                <span class="">RM {{ calculateTax() }}</span>
              </li>
              <hr class="d-flex align-self-center" style="width: 90%;">
              <li v-if="cart.length" class="list-group-item d-flex justify-content-between align-items-center py-2">
                Total:
                <span class="">RM {{ calculateTotal() }}</span>
              </li>
              <li class="list-group-item">
                <button class="btn btn-primary w-100 btn-block">Proceed to Checkout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
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
      showDelete: false,
      cart: [
        {
          name: 'Strawberry',
          image: '/assets/product-3.png',
          description: 'Description of the product',
          quantity: 1,
          price: 10.00,
        },
      ],
    };
  },
  methods: {
    toggleDelete() {
      this.showDelete = !this.showDelete;
    },
    removeProduct(index) {
      this.cart.splice(index, 1);
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
  },
};
</script>

<style>
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
</style>
