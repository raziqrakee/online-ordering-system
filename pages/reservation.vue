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
              <div class="row">
                <label for="reservation-time" class="form-label text-lg col-12">Choose Slot:</label>
                <div class="col-6">
                  <input type="date" id="reservation-date" v-model="newReservation.date" :min="today" class="form-control text-lg rounded-lg rounded" @change="fetchAvailableSlots">
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
            <div class="col-12 mt-2">
              <label for="fullname" class="form-label text-lg">Fullname:</label>
              <input type="text" id="fullname" v-model="newReservation.customer" placeholder="Fullname" class="form-control text-lg rounded w-100">
            </div>
            <div class="col-12 mt-2">
              <label for="email" class="form-label text-lg">Email:</label>
              <input type="email" id="email" v-model="newReservation.email" placeholder="Email" class="form-control text-lg rounded w-100">
            </div>
            <div class="col-6 mt-2">
              <label for="pax" class="form-label text-lg">Number of Pax:</label>
              <input type="number" id="pax" v-model="newReservation.pax" placeholder="Number of Pax" class="form-control text-lg rounded w-100">
            </div>
            <div class="col-6 mt-2">
              <label for="phone" class="form-label text-lg">Phone Number:</label>
              <input type="tel" id="phone" v-model="newReservation.phone" placeholder="Phone Number" class="form-control text-lg rounded w-100">
            </div>
            <div class="d-flex gap-4 justify-start mt-5">
              <button class="btn btn-outline-secondary w-25 rounded-pill" @click="cancelReservation">Cancel</button>
              <button class="btn btn-primary w-25 rounded-pill" @click="validateAndBookReservation">Book</button>
            </div>
            <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmationModal" class="custom-modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-center">
            <h5 class="modal-title">Reservation Confirmed</h5>
          </div>
          <div class="modal-body">
            <p>Your reservation has been successfully made. </br>Please refer to your email to track your reservation status.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="showConfirmationModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
import moment from 'moment';

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
        email: '',
        status: 'Pending'
      },
      availableSlots: [],
      errorMessage: '',
      showConfirmationModal: false
    };
  },
  computed: {
    today() {
      return moment().format('YYYY-MM-DD');
    }
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
    validateAndBookReservation() {
      this.errorMessage = '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9]{9,11}$/;

      if (!this.newReservation.customer) {
        this.errorMessage = 'Customer name is required';
        return;
      }
      if (!emailPattern.test(this.newReservation.email)) {
        this.errorMessage = 'Valid email is required';
        return;
      }
      if (!this.newReservation.date) {
        this.errorMessage = 'Date is required';
        return;
      }
      if (!this.newReservation.time_slot) {
        this.errorMessage = 'Time slot is required';
        return;
      }
      if (this.newReservation.pax < 1 || this.newReservation.pax > 6) {
        this.errorMessage = 'Number of pax must be between 1 and 6';
        return;
      }
      if (!phonePattern.test(this.newReservation.phone)) {
        this.errorMessage = 'Phone number must be 9-11 digits';
        return;
      }

      this.bookReservation();
    },
    async bookReservation() {
      try {
        await axios.post('http://localhost:8000/api/reservations', this.newReservation);
        this.showConfirmationModal = true;
        this.newReservation = {
          customer: '',
          date: '',
          time_slot: '',
          pax: '',
          phone: '',
          email: '',
          status: 'Pending'
        };
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Failed to save reservation';
      }
    },
    cancelReservation() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
/* styles as provided */
.menu {
  border-bottom: 1px solid #e6e6e6;
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
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-dialog {
  max-width: 500px;
}
.modal-content {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 20px;
}
.modal-header {
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.modal-body {
  margin: 20px 0;
  font-size: 1rem;
}
.modal-footer {
  display: flex;
  justify-content: center;
}
.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
