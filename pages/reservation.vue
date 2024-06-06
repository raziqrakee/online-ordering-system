<template>
  <div>
    <Navbar></Navbar>
    <div id="reservation" style="min-height: 60vh;">
      <div class="bg-white text-dark px-4 py-5 mx-5">
        <div class="w-75">
            <div class="d-flex align-items-center mb-4">
                <h3 class="w-100 text-2xl fw-bold">Table Reservation</h3>
            </div>
            <div class="d-flex row mt-4">
              <div class="col-12 mt-2">
                <label for="fullname" class="form-label text-lg">Fullname:</label>
                <input type="text" id="fullname" v-model="newReservation.customer" placeholder="Fullname" class="form-control text-lg rounded w-100">
              </div>
              <div class="col-6 mt-2">
                <label for="pax" class="form-label text-lg">Number of Pax:</label>
                <input type="number" id="pax" v-model="newReservation.pax" placeholder="Number of Pax" class="form-control text-lg rounded w-100">
              </div>
              <div class="col-6 mt-2">
                <label for="phone" class="form-label text-lg">Phone Number:</label>
                <input type="tel" id="phone" v-model="newReservation.phone" placeholder="Phone Number" class="form-control text-lg rounded w-100">
              </div>
              <div class="col-12 mt-2">
                <div class="row">
                  <label for="reservation-time" class="form-label text-lg col-12">Choose Slot:</label>
                  <div class="col-6">
                      <input type="date" id="reservation-date" v-model="newReservation.date" class="form-control text-lg rounded-lg rounded" @change="fetchAvailableSlots">
                  </div>
                  <div class="col-6">
                      <div class="d-flex gap-2">
                          <select v-model="newReservation.time_slot" class="form-control text-lg rounded">
                              <option v-for="slot in availableSlots" :key="slot" :value="slot">{{ slot }}</option>
                          </select>
                      </div>
                  </div>
                </div>
            </div>
            <div class="d-flex gap-4 justify-start mt-5">
                <button class="btn btn-outline-secondary w-25">Cancel</button>
                <button class="btn btn-primary w-25" @click="bookReservation">Book</button>
            </div>
            <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div>
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
import axios from 'axios';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      newReservation: {
        customer: '',
        date: '',
        time_slot: '',
        pax: '',
        phone: '',
        status: 'Pending'
      },
      availableSlots: [],
      errorMessage: ''
    };
  },
  methods: {
    async fetchAvailableSlots() {
      try {
        const response = await axios.get(`http://localhost:8000/api/available-slots/${this.newReservation.date}`);
        this.availableSlots = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Failed to fetch available slots';
      }
    },
    async bookReservation() {
      this.errorMessage = '';
      try {
        await axios.post('http://localhost:8000/api/reservations', this.newReservation);
        alert('Reservation booked successfully');
        this.newReservation = {
          customer: '',
          date: '',
          time_slot: '',
          pax: '',
          phone: '',
          status: 'Pending'
        };
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Failed to save reservation';
      }
    }
  }
};
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
