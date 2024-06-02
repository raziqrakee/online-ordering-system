<template>
  <div>
    <Navbar></Navbar>
    <!-- MAIN -->
    <div id="reservation" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-5 mx-5">
        <div class="w-75">
            <div class="d-flex align-items-center mb-4">
                <h3 class="w-100 text-2xl fw-bold">Table Reservation</h3>
            </div>
            <div class="d-flex row mt-4">
              <div class="col-12 mt-2">
                <label for="fullname" class="form-label text-lg">Fullname:</label>
                <input type="text" id="fullname" placeholder="Fullname" class="form-control text-lg rounded w-100">
              </div>
              <div class="col-6 mt-2">
                <label for="pax" class="form-label text-lg">Number of Pax:</label>
                <input type="number" id="pax" placeholder="Number of Pax" class="form-control text-lg rounded w-100">
              </div>
              <div class="col-6 mt-2">
                <label for="phone" class="form-label text-lg">Phone Number:</label>
                <input type="tel" id="phone" placeholder="Phone Number" class="form-control text-lg rounded w-100">
              </div>
              <div class="col-12 mt-2">
                <div class="row">
                  <label for="reservation-time" class="form-label text-lg col-12">Choose Slot:</label>
                  <div class="col-6">
                      <input type="date" id="reservation-date" class="form-control text-lg rounded-lg rounded w-100">
                  </div>
                  <div class="col-6">
                      <div class="d-flex gap-2">
                          <input type="number" id="hours" class="form-control text-lg rounded-lg rounded" placeholder="HH">
                          <input type="number" id="minutes" class="form-control text-lg rounded-lg rounded" placeholder="MM">
                          <select id="ampm" class="form-control text-lg rounded">
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                          </select>
                      </div>
                  </div>
                </div>
            </div>
            <div class="d-flex gap-4 justify-start mt-5">
                <button class="btn btn-outline-secondary w-25">Cancel</button>
                <button class="btn btn-primary w-25">Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
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
.menu {
  border-bottom: 1px solid #e6e6e6;
}
.el-submenu__icon-arrow {
    display: none !important;
}
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
