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
                <span class="text-lg">{{ item.name }}</span>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <div class="d-flex align-items-center gap-2">
                  <span class="text-lg">Quantity:</span>
                  <div class="btn-group" role="group">
                    <input type="number" v-model.number="item.quantity" :readonly="!showDelete" class="form-control qtt" min="1" @change="updateQuantity(item)">
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
              <textarea class="form-control w-100" id="special-instructions" rows="4" v-model="specialInstructions"></textarea>
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
              <div class="list-group-item">
                <button v-if="cart.length > 0" class="btn btn-primary w-100 btn-block" @click="proceedToCheckout">Proceed to Checkout</button>
                <span v-else @click="showEmptyCartMessage">Cart is empty. Nothing to checkout.</span>
              </div>
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
      cart: [],
      specialInstructions: ''
    };
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.$nextTick(() => {
        this.updateCartCount();
      });
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem('specialInstructions', this.specialInstructions); // Save special instructions
      this.updateCartCount();
    },
    proceedToCheckout() {
      if (this.cart.length > 0) {
        this.saveCart();
        this.$router.push('/checkout');
      } else {
        this.$nuxt.$emit('message', { type: 'error', text: 'Cart is empty. Nothing to checkout.' });
      }
    },
    showEmptyCartMessage() {
      this.$nuxt.$emit('message', { type: 'error', text: 'Cart is empty. Nothing to checkout.' });
    },
    toggleDelete() {
      this.showDelete = !this.showDelete;
    },
    removeProduct(index) {
      this.cart.splice(index, 1);
      this.saveCart();
    },
    updateQuantity(item) {
      const index = this.cart.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.cart[index].quantity = item.quantity;
        this.saveCart();
      }
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
    updateCartCount() {
      const event = new CustomEvent('cart-updated');
      window.dispatchEvent(event);
    }
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
