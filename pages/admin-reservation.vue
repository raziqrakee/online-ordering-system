<template>
  <div class="admin-reservation">
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

      <div class="admin-reservation-table">
        <div class="table-header">
          <h1 class="title">Reservation</h1>
          <div class="actions">
            <button class="btn btn-add" @click="showAddModalVisible = true">
              <span>Add Reservation</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">No. Pax</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Action</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id">
              <td>{{ reservation.customer }}</td>
              <td>{{ reservation.time }}</td>
              <td>{{ reservation.date }}</td>
              <td>{{ reservation.pax }}</td>
              <td>{{ reservation.phone }}</td>
              <td>
                <div class="d-flex gap-1">
                  <button class="btn btn-accept" @click="acceptReservation(reservation.id)">✔</button>
                  <button class="btn btn-reject" @click="rejectReservation(reservation.id)">✖</button>
                  <button class="btn btn-edit" @click="editReservation(reservation.id)">✎</button>
                </div>
              </td>
              <td>
                <el-button :type="statusButtonColor(reservation.status)">{{ reservation.status }}</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals (Edit, Delete, Add) -->
    <el-dialog :visible.sync="showAddModalVisible" title="Add Reservation">
      <el-form :model="newReservation">
        <!-- Form content for new reservation -->
        <el-form-item label="Customer Name">
          <el-input v-model="newReservation.customer"></el-input>
        </el-form-item>
        <div class="el-form-item">
          <label for="reservation-date">Date</label>
          <div class="w-50">
            <input type="date" id="reservation-date" v-model="newReservation.date" class="form-control text-lg rounded-lg">
          </div>
        </div>
        <div class="el-form-item">
          <label for="reservation-time">Time</label>
          <div class="w-50">
            <div class="d-flex gap-2">
              <input type="time" class="form-control text-lg rounded-lg" @change="validateTime">
            </div>
          </div>
        </div>
        <el-form-item label="No. Pax">
          <el-input v-model="newReservation.pax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input v-model="newReservation.phone"></el-input>
        </el-form-item>
        <el-form-item label="Reservation Status">
          <el-select v-model="newReservation.status" placeholder="Select status">
            <el-option label="Pending" value="Pending"></el-option>
            <el-option label="Completed" value="Completed"></el-option>
            <el-option label="In-Process" value="In-Process"></el-option>
            <el-option label="Cancelled" value="Cancelled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertNewReservation">Save</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showEditModalVisible" title="Edit Reservation">
      <el-form :model="editedReservation">
        <!-- Form content for new reservation -->
        <el-form-item label="Customer Name">
          <el-input v-model="newReservation.customer"></el-input>
        </el-form-item>
        <div class="el-form-item">
          <label for="reservation-date">Date</label>
          <div class="w-50">
            <input type="date" id="reservation-date" v-model="newReservation.date" class="form-control text-lg rounded-lg">
          </div>
        </div>
        <div class="el-form-item">
          <label for="reservation-time">Time</label>
          <div class="w-50">
            <div class="d-flex gap-2">
              <input type="time" class="form-control text-lg rounded-lg" @change="validateTime">
            </div>
          </div>
        </div>
        <el-form-item label="No. Pax">
          <el-input v-model="newReservation.pax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input v-model="newReservation.phone"></el-input>
        </el-form-item>
        <el-form-item label="Reservation Status">
          <el-select v-model="newReservation.status" placeholder="Select status">
            <el-option label="Pending" value="Pending"></el-option>
            <el-option label="Completed" value="Completed"></el-option>
            <el-option label="In-Process" value="In-Process"></el-option>
            <el-option label="Cancelled" value="Cancelled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveEditedReservation">Save</el-button>
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
      activeLink: 'reservations',
      showAddModalVisible: false,
      newReservation: {
        customer: '',
        time: '',
        date: '',
        pax: '',
        phone: '',
        details: [],
        status: '',
        hours: '',
        minutes: '',
        ampm: ''
      },
      reservations: [
        { id: 1, customer: 'John Doe', time: '09:00 AM', date: '01 06 2024', pax: '4', phone: '123-456-7890', details: [{ name: 'Ice Americano', quantity: 2 }], status: 'Pending' },
        { id: 2, customer: 'Jane Smith', time: '12:30 PM', date: '02 06 2024', pax: '2', phone: '234-567-8901', details: [{ name: 'Ice Cream Strawberry', quantity: 1 }, { name: 'Ice Americano', quantity: 2 }], status: 'Completed' },
      ],
      editedReservation: {
        id: '',
        customer: '',
        time: '',
        date: '',
        pax: '',
        phone: '',
        details: [],
        status: '',
      },
    };
  },
  methods: {
    fetchReservations() {
      // Fetch reservations from API
    },
    insertNewReservation() {
      const newReservationId = this.reservations.length + 1; // Generate a unique ID for the new reservation
      const newReservation = { ...this.newReservation, id: newReservationId }; // Add the generated ID to the new reservation
      this.reservations.push(newReservation); // Add the new reservation to the reservations array
      this.showAddModalVisible = false; // Close the modal after saving
      // Reset the newReservation object for next entry
      this.newReservation = {
        customer: '',
        time: '',
        date: '',
        pax: '',
        phone: '',
        details: [],
        status: '',
        hours: '',
        minutes: '',
        ampm: ''
      };
    },
    acceptReservation(reservationId) {
      // Find the reservation by ID and update its status to "Accepted"
      const reservationIndex = this.reservations.findIndex(reservation => reservation.id === reservationId);
      if (reservationIndex !== -1) {
        this.reservations[reservationIndex].status = 'Accepted';
      }
    },
    rejectReservation(reservationId) {
      // Find the reservation by ID and update its status to "Rejected"
      const reservationIndex = this.reservations.findIndex(reservation => reservation.id === reservationId);
      if (reservationIndex !== -1) {
        this.reservations[reservationIndex].status = 'Rejected';
      }
    },
    editReservation(reservation) {
      // Set the editedReservation object with the data of the selected reservation
      this.editedReservation = { ...reservation };
      // Show the edit modal
      this.showEditModalVisible = true;
    },
    saveEditedReservation() {
      // Find the index of the edited reservation in the reservations array
      const index = this.reservations.findIndex(reservation => reservation.id === this.editedReservation.id);
      if (index !== -1) {
        // Update the reservation in the reservations array
        this.reservations[index] = { ...this.editedReservation };
      }
      // Close the edit modal after saving
      this.showEditModalVisible = false;
      // Clear the editedReservation object
      this.editedReservation = {
        id: '',
        customer: '',
        time: '',
        date: '',
        pax: '',
        phone: '',
        details: [],
        status: '',
      };
    },
    statusButtonColor(status) {
      switch (status) {
        case 'Pending':
          return 'warning';
        case 'Completed':
          return 'success';
        case 'In-Process':
          return 'info';
        case 'Cancelled':
          return 'danger';
        case 'Accepted':
          return 'success'; // Add custom color for Accepted status
        case 'Rejected':
          return 'danger'; // Add custom color for Rejected status
        default:
          return 'primary';
      }
    },
    validateTime() {
      const { hours, minutes, ampm } = this.newReservation;
      // Ensure hours are between 01 and 12
      if (parseInt(hours) < 1 || parseInt(hours) > 12) {
        this.newReservation.hours = '';
      }
      // Ensure minutes are between 00 and 59
      if (parseInt(minutes) < 0 || parseInt(minutes) > 59) {
        this.newReservation.minutes = '';
      }
      // Ensure both hours and minutes are entered before selecting AM/PM
      if ((hours !== '' && minutes === '') || (hours === '' && minutes !== '')) {
        this.newReservation.ampm = '';
      }
    },
    statusText(status) {
      // Status text logic
    },
  },
};
</script>

<style>
.admin-reservation {
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

.admin-reservation-table {
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
  color: #ffffff
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

.btn-edit {
  color: #000000;
  padding: 1px 7px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-edit:hover {
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
