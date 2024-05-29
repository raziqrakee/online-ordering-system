<template>
 <div>
<Navbar></Navbar>
    <!-- navigation menue end -->
    <!-- MAIN -->
    <div id="home-section" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-5 mx-5">
        <div class="row">
            <div class="col-md-8 col-sm-6 p-4">
              <h3 class="text-2xl fw-bold mb-2">My Cart</h3>
              <hr>
              <div class="d-flex justify-content-between align-items-center gap-2">
                <div class="d-flex align-items-center gap-2">
                  <img src="/assets/product-3.png" alt="Product Icon" class="product-list-img">
                  <span class="text-lg">Strawberry</span>
                </div>
                <span class="text-lg">Quantity:</span>
                <div class="btn-group" role="group">
                  <input type="number" value="1" class="form-control qtt">
                </div>
                <span class="text-lg">x RM 10.00</span>
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
                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                        Subtotal:
                        <span class="">RM 10.00</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                        Tax:
                        <span class="">RM 1.00</span>
                    </li>
                    <hr class="d-flex align-self-center" style="width: 90%;">
                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                        Total:
                        <span class="">RM 11.00</span>
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
    Navbar, // Register the Navbar component
    Footer, // Register the Footer component
  },
}
</script>

<style>
.qtt{
  width: 60px !important;
}

.btn-primary{
  background-color: #000000;
  border-color: #00000000;
}

.btn-primary:hover{
  background-color: #FFE9F5;
  border-color: #F390C7;
  color: #000000;
}

.list-group-item{
  border: #00000000;
}

.product-list-img{
  width: 60px;
}

</style>
