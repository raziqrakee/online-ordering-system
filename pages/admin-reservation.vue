<template>
  <div class="admin-reservation">
    <Sidebar></Sidebar>
    <div class="content">
      <div class="header">
        <div class="search">
          <el-input
            placeholder="Search by name or phone"
            prefix-icon="el-icon-search"
            v-model="searchQuery"
          ></el-input>
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
            <button class="btn btn-add" @click="openAddModal">
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
              <th scope="col">Time Slot</th>
              <th scope="col">Date</th>
              <th scope="col">No. Pax</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Action</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in paginatedReservations" :key="reservation.id">
              <td>{{ reservation.customer }}</td>
              <td>{{ reservation.time_slot }}</td>
              <td>{{ formatDate(reservation.date) }}</td>
              <td>{{ reservation.pax }}</td>
              <td>{{ reservation.phone }}</td>
              <td>
                <div class="d-flex gap-1">
                  <button class="btn btn-accept" @click="updateReservationStatus(reservation.id, 'Confirmed')">✔</button>
                  <button class="btn btn-reject" @click="updateReservationStatus(reservation.id, 'Cancelled')">✖</button>
                  <button class="btn btn-edit" @click="editReservation(reservation)">✎</button>
                </div>
              </td>
              <td>
                <el-button :type="statusButtonColor(reservation.status)">{{ reservation.status }}</el-button>
              </td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredReservations.length"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="showAddModalVisible" title="Add Reservation">
      <el-form :model="newReservation" ref="newReservationForm" :rules="reservationRules">
        <el-form-item label="Date" prop="date">
          <el-date-picker v-model="newReservation.date" type="date" :picker-options="datePickerOptions" @change="fetchAvailableSlots('new')"></el-date-picker>
        </el-form-item>
        <el-form-item label="Time Slot" prop="time_slot">
          <el-select v-model="newReservation.time_slot" placeholder="Select time slot">
            <el-option v-for="slot in availableSlots.new" :key="slot" :label="slot" :value="slot"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Customer Name" prop="customer">
          <el-input v-model="newReservation.customer"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="newReservation.email"></el-input>
        </el-form-item>
        <el-form-item label="No. Pax" prop="pax">
          <el-input v-model.number="newReservation.pax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="newReservation.phone"></el-input>
        </el-form-item>
        <el-form-item label="Reservation Status" prop="status">
          <el-select v-model="newReservation.status" placeholder="Select status">
            <el-option label="Pending" value="Pending"></el-option>
            <el-option label="Confirmed" value="Confirmed"></el-option>
            <el-option label="Cancelled" value="Cancelled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="validateAndSaveReservation">Save</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showEditModalVisible" title="Edit Reservation">
      <el-form :model="editedReservation" ref="editedReservationForm" :rules="reservationRules">
        <el-form-item label="Date" prop="date">
          <el-date-picker v-model="editedReservation.date" type="date" :picker-options="datePickerOptions" @change="fetchAvailableSlots('edit')"></el-date-picker>
        </el-form-item>
        <el-form-item label="Time Slot" prop="time_slot">
          <el-select v-model="editedReservation.time_slot" placeholder="Select time slot">
            <el-option v-for="slot in availableSlots.edit" :key="slot" :label="slot" :value="slot"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Customer Name" prop="customer">
          <el-input v-model="editedReservation.customer"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editedReservation.email"></el-input>
        </el-form-item>
        <el-form-item label="No. Pax" prop="pax">
          <el-input v-model.number="editedReservation.pax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="editedReservation.phone"></el-input>
        </el-form-item>
        <el-form-item label="Reservation Status" prop="status">
          <el-select v-model="editedReservation.status" placeholder="Select status">
            <el-option label="Pending" value="Pending"></el-option>
            <el-option label="Confirmed" value="Confirmed"></el-option>
            <el-option label="Cancelled" value="Cancelled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="validateAndUpdateReservation">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import moment from 'moment';
import { Message } from 'element-ui';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      showAddModalVisible: false,
      showEditModalVisible: false,
      searchQuery: '',
      newReservation: {
        customer: '',
        date: '',
        time_slot: '',
        pax: '',
        phone: '',
        email: '',
        status: 'Pending'
      },
      editedReservation: {
        id: '',
        customer: '',
        date: '',
        time_slot: '',
        pax: '',
        phone: '',
        email: '',
        status: ''
      },
      reservations: [],
      availableSlots: {
        new: [],
        edit: []
      },
      currentPage: 1,
      pageSize: 10,
      datePickerOptions: {
        disabledDate(date) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date < today;
        }
      },
      reservationRules: {
        customer: [{ required: true, message: 'Customer name is required', trigger: 'blur' }],
        email: [
          { required: true, type: 'email', message: 'Valid email is required', trigger: 'blur' }
        ],
        date: [{ required: true, message: 'Date is required', trigger: 'change' }],
        time_slot: [{ required: true, message: 'Time slot is required', trigger: 'change' }],
        pax: [
          { required: true, type: 'number', message: 'Number of pax is required', trigger: 'blur' },
          { type: 'number', min: 1, max: 6, message: 'Number of pax must be between 1 and 6', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Phone number is required', trigger: 'blur' },
          { pattern: /^[0-9]{9,11}$/, message: 'Phone number must be 9-11 digits', trigger: 'blur' }
        ],
        status: [{ required: true, message: 'Status is required', trigger: 'change' }],
      },
    };
  },
  computed: {
    filteredReservations() {
      const query = this.searchQuery.toLowerCase();
      return this.reservations.filter(
        reservation =>
          reservation.customer.toLowerCase().includes(query) ||
          reservation.phone.toLowerCase().includes(query)
      );
    },
    paginatedReservations() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredReservations.slice(start, end);
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    async fetchReservations() {
      const response = await axios.get('http://localhost:8000/api/reservations');
      this.reservations = response.data.map(reservation => ({
        ...reservation,
        date: this.formatDate(reservation.date)
      }));
    },
    async fetchAvailableSlots(type) {
      const date = type === 'new' ? this.newReservation.date : this.editedReservation.date;
      if (!date) return;
      const formattedDate = moment(date).format('YYYY-MM-DD');
      try {
        const response = await axios.get(`http://localhost:8000/api/available-slots/${formattedDate}`);
        this.availableSlots[type] = response.data;
      } catch (error) {
        console.error('Failed to fetch available slots:', error);
      }
    },
    openAddModal() {
      this.showAddModalVisible = true;
      this.newReservation.date = '';
      this.newReservation.time_slot = '';
      this.availableSlots.new = [];
    },
    validateAndSaveReservation() {
      this.$refs.newReservationForm.validate(async (valid) => {
        if (valid) {
          try {
            const reservationData = { ...this.newReservation, date: moment(this.newReservation.date).format('YYYY-MM-DD') };
            await axios.post('http://localhost:8000/api/reservations', reservationData);
            this.fetchReservations();
            this.showAddModalVisible = false;
            Message.success('Reservation added successfully');
          } catch (error) {
            console.error('Failed to save reservation:', error);
            Message.error('Failed to save reservation');
          }
        } else {
          Message.error('Please correct the errors before saving');
        }
      });
    },
    validateAndUpdateReservation() {
      this.$refs.editedReservationForm.validate(async (valid) => {
        if (valid) {
          try {
            const reservationData = { ...this.editedReservation, date: moment(this.editedReservation.date).format('YYYY-MM-DD') };
            await axios.put(`http://localhost:8000/api/reservations/${reservationData.id}`, reservationData);
            this.fetchReservations();
            this.showEditModalVisible = false;
            Message.success('Reservation updated successfully');
          } catch (error) {
            console.error('Failed to update reservation:', error);
            Message.error('Failed to update reservation');
          }
        } else {
          Message.error('Please correct the errors before saving');
        }
      });
    },
    async updateReservationStatus(id, status) {
      try {
        await axios.put(`http://localhost:8000/api/reservations/${id}`, { status });
        this.fetchReservations();
        Message.success('Reservation status updated successfully');
      } catch (error) {
        console.error('Failed to update reservation status:', error);
        Message.error('Failed to update reservation status');
      }
    },
    editReservation(reservation) {
      this.editedReservation = { ...reservation };
      this.showEditModalVisible = true;
      this.fetchAvailableSlots('edit');
    },
    statusButtonColor(status) {
      switch (status) {
        case 'Pending':
          return 'warning';
        case 'Confirmed':
          return 'success';
        case 'Cancelled':
          return 'danger';
        default:
          return 'primary';
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchReservations();
  }
};
</script>

<style>
.admin-reservation {
  display: flex;
  min-height: 100vh;
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
